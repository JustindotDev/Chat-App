import { Box, Container } from "@mui/material";
import { useEffect } from "react";

import { useChatStore } from "../store/useChatStore";

import NoChatSelectedContainer from "../components/NoChatSelectedContainer";
import ChatContainer from "../components/ChatContainer";
import SideBar from "../components/SideBar";

const HomePage = () => {
  const { getUsers, selectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          width: "60%",
        }}
      >
        {/* Contacts Side Bar */}
        <SideBar />

        {/* Chat Section */}
        <Box
          sx={{
            width: "75%",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          {!selectedUser ? <NoChatSelectedContainer /> : <ChatContainer />}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
