import Chat from "../models/chats-model.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user-model.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

export const UserSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Find recent contacts based on sent/received messages
    const recentMessages = await Chat.find({
      $or: [{ senderId: loggedInUserId }, { recieverId: loggedInUserId }],
    })
      .sort({ createdAt: -1 }) // newest first
      .limit(50); // limit for performance

    // Extract unique user IDs you've chatted with
    const recentUserIds = [
      ...new Set(
        recentMessages.flatMap((msg) => {
          const sender = msg.senderId?.toString();
          const receiver = msg.recieverId?.toString();
          return [sender, receiver].filter(
            (id) => id && id !== loggedInUserId.toString()
          );
        })
      ),
    ];

    // Fetch user details for recent contacts
    const recentUsers = await User.find({ _id: { $in: recentUserIds } }).select(
      "-password"
    );

    // Fetch remaining users not in recent chats
    const otherUsers = await User.find({
      _id: { $nin: [...recentUserIds, loggedInUserId] },
    }).select("-password");

    // Attach timestamp to each recent user
    const userLastMessageMap = {};
    recentMessages.forEach((msg) => {
      const otherUserId =
        msg.senderId.toString() === loggedInUserId.toString()
          ? msg.recieverId.toString()
          : msg.senderId.toString();

      if (
        !userLastMessageMap[otherUserId] ||
        new Date(msg.createdAt) > new Date(userLastMessageMap[otherUserId])
      ) {
        userLastMessageMap[otherUserId] = msg.createdAt;
      }
    });

    // Sort recent users by last message time and attach latestMessage
    const sortedRecentUsers = await Promise.all(
      recentUsers.map(async (user) => {
        const lastMessage = await Chat.findOne({
          $or: [
            { senderId: loggedInUserId, recieverId: user._id },
            { senderId: user._id, recieverId: loggedInUserId },
          ],
        })
          .sort({ createdAt: -1 })
          .lean();

        return {
          ...user.toObject(),
          latestMessage: lastMessage || null,
        };
      })
    );

    // Sort by latestMessage timestamp
    sortedRecentUsers.sort((a, b) => {
      const aTime = new Date(a.latestMessage?.createdAt || 0);
      const bTime = new Date(b.latestMessage?.createdAt || 0);
      return bTime - aTime;
    });

    const allUsers = [...sortedRecentUsers, ...otherUsers];

    res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error in the UserSideBar Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    // get the messages of the sender and reciever
    const chats = await Chat.find({
      $or: [
        {
          senderId: myId,
          recieverId: userToChatId,
        },
        {
          senderId: userToChatId,
          recieverId: myId,
        },
      ],
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log("Error in the getMessages Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const SendMessage = async (req, res) => {
  const { textMessage, image } = req.body;
  try {
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }
    const newChat = new Chat({
      senderId,
      recieverId,
      textMessage,
      image: imageUrl,
    });

    await newChat.save();

    // for Real-time messaging
    const recieverSocketId = getRecieverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newChat", newChat);
      io.to(recieverSocketId).emit("sidebarUpdate");
    }

    // Also notify the sender to update their own sidebar
    const senderSocketId = getRecieverSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("sidebarUpdate");
    }

    res.status(201).json(newChat);
  } catch (error) {
    console.log("Error in the sendMessage Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
