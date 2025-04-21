import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Box, Typography } from "@mui/material";

const NoChatSelectedContainer = () => {
  return (
    <Box
      width={"100%"}
      display={"grid"}
      justifyContent={"center"}
      alignItems={"center"}
      justifyItems={"center"}
      mb={"2rem"}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(98, 70, 234, 0.2)",
          borderRadius: "10px",
          padding: "5px",
          boxShadow: "0 0 15px rgba(98, 70, 234, 0.5)",
          animation: "bounce 1.5s infinite",

          "@keyframes bounce": {
            "0%, 100%": {
              transform: "translateY(0)",
            },
            "50%": {
              transform: "translateY(-8px)",
            },
          },
        }}
      >
        <ChatBubbleOutlineIcon
          sx={{
            fontSize: "2rem",
            color: "primary.main",
          }}
        />
      </Box>
      <Typography
        sx={{ color: "tertiary.main", mt: "10px", fontSize: "2rem" }}
        variant="h6"
      >
        Welcome Chat!
      </Typography>
      <Typography sx={{ color: "tertiary.main", mt: "20px" }} variant="body2">
        Select a conversation from the sidebar to start chatting
      </Typography>
    </Box>
  );
};

export default NoChatSelectedContainer;
