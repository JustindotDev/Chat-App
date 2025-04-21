import Chat from "../models/chats-model.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user-model.js";

export const UserSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUser);
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

    res.status(201).json(newChat);
  } catch (error) {
    console.log("Error in the sendMessage Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
