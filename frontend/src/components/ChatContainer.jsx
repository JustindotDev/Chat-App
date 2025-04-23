import { Box, Button, Typography, CardMedia } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import IconButton from "@mui/material/IconButton";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { useAuthStore } from "../store/useAuthStore.js";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import MessageSkeleton from "./MessageSkeleton.jsx";
import { formatMessageTime } from "../lib/time-format.js";
import React, { Fragment } from "react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, onlineUser } = useAuthStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInput = useRef(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        textMessage: text.trim(),
        image: imagePreview,
      }),
        setText("");
      setImagePreview(null);
      if (fileInput.current) fileInput.current.value = "";
    } catch (error) {
      console.log("Failed to send a message: ", error);
    }
  };

  return (
    <Box width="100%" height="90vh" display="flex" flexDirection="column">
      {/* Header */}
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ gap: 1.5 }}>
          <Avatar
            src={selectedUser.profilePic}
            sx={{ width: 32, height: 32 }}
          />
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              variant="h6"
              color="inherit"
              sx={{ marginBottom: 0, paddingBottom: 0, lineHeight: 1.5 }}
            >
              {selectedUser.fullName}
            </Typography>
            <Typography
              variant="caption"
              color={
                onlineUser.includes(selectedUser._id)
                  ? "success.main"
                  : "text.secondary"
              }
              sx={{ marginBottom: 0, paddingBottom: 0, lineHeight: 1 }}
            >
              {onlineUser.includes(selectedUser._id) ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Scrollable Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          px: 2,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {/* Spacer pushes messages down when there are few */}
        <Box sx={{ flexGrow: 1 }} />

        {isMessagesLoading
          ? [...Array(5)].map((_, idx) => (
              <Fragment key={idx}>
                <MessageSkeleton side="left" />
                <MessageSkeleton side="right" />
              </Fragment>
            ))
          : messages.map((message) => (
              <Box
                key={message._id}
                mb={4}
                display="flex"
                justifyContent={
                  message.senderId === authUser._id ? "flex-end" : "flex-start"
                }
                alignItems="flex-end"
                position="relative"
              >
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    position: "absolute",
                    top: -15,
                    left: 55,
                    right: 55,
                    textAlign:
                      message.senderId === authUser._id ? "right" : "left", // Align the time based on message sender
                  }}
                >
                  {formatMessageTime(message.createdAt)}
                </Typography>
                <Box
                  sx={{
                    maxWidth: "60%",
                    p: 1,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection:
                      message.senderId === authUser._id ? "row-reverse" : "row",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  <Avatar
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic
                        : selectedUser.profilePic
                    }
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box
                    sx={{
                      bgcolor:
                        message.senderId === authUser._id
                          ? "primary.main"
                          : "grey.300",
                      color:
                        message.senderId === authUser._id ? "white" : "black",
                      p: 1.5,
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius:
                        message.senderId === authUser._id ? "none" : "15px",
                      borderBottomLeftRadius:
                        message.senderId === authUser._id ? "15px" : "none",
                    }}
                  >
                    {message.image && (
                      <Box display="flex">
                        <img
                          src={message.image}
                          alt="Image"
                          style={{
                            height: "9rem",
                            width: "9rem",
                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                    )}
                    {message.textMessage && (
                      <Typography
                        sx={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {message.textMessage}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
        <div ref={scrollRef}></div>
      </Box>

      {/* Input Section */}
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="flex-start"
        sx={{
          p: 1.5,
        }}
        justifyContent={"center"}
      >
        {imagePreview && (
          <Box position="relative">
            <CardMedia
              component="img"
              image={imagePreview}
              alt="Image Preview"
              sx={{
                borderRadius: "10px",
                height: "5rem",
                width: "5rem",
                ml: 6,
                mb: 1,
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bgcolor: "gray",
                color: "white",
                height: "1.5rem",
                width: "1.5rem",
                top: -7,
                right: -7,
              }}
              onClick={removeImage}
            >
              <CloseIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Box>
        )}
        <Box display={"flex"} gap={1}>
          <IconButton
            disableRipple
            sx={{ minWidth: 0, padding: 0 }}
            onClick={() => fileInput.current?.click()}
          >
            <InsertPhotoIcon
              sx={{
                fontSize: "2rem",
                color: "primary.main",
              }}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInput}
              onChange={handleImageChange}
            />
          </IconButton>
          <textarea
            style={{
              resize: "none",
              width: "29.5rem",
              height: "2.3rem",
              borderRadius: "5px",
              backgroundColor: "transparent",
              color: "white",
              fontSize: "16px",
              paddingTop: "7px",
              fontFamily: "roboto",
              overflow: "hidden",
              paddingLeft: ".7rem",
            }}
            placeholder="Type a Message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <Button
            sx={{
              width: "2.5rem",
              height: "2.2rem",
              minWidth: 0,
              padding: 0,
              bgcolor: "transparent",
            }}
            onClick={handleSendMessage}
            disabled={!text.trim() && !imagePreview}
          >
            <SendIcon
              sx={{
                fontSize: "1.7rem",
                transform: "rotate(310deg)",
                ml: "0.5rem",
                mb: "0.5rem",
              }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContainer;
