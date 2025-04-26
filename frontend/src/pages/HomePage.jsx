import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Container, Divider } from "@mui/material";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import GroupIcon from "@mui/icons-material/Group";
import ContactSkeleton from "../components/ContactSkeleton";
import NoChatSelectedContainer from "../components/NoChatSelectedContainer";
import ChatContainer from "../components/ChatContainer";
import { useAuthStore } from "../store/useAuthStore";
import Badge from "@mui/material/Badge";

const HomePage = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUser } = useAuthStore();

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
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"25%"}
          height="90vh"
        >
          <Box display={"flex"} alignItems={"center"} ml={"1rem"} mt={"1rem"}>
            <GroupIcon />
            <Typography sx={{ p: 1 }}>Contacts</Typography>
          </Box>
          <Divider />

          <List
            sx={{
              flex: 1,
              width: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {users.map((user) =>
              isUsersLoading ? (
                <ContactSkeleton key={user._id} />
              ) : (
                // TODO: put to another file and make user a props.
                <ListItem disablePadding sx={{ mb: "1rem" }} key={user._id}>
                  <ListItemButton
                    onClick={() => setSelectedUser(user)}
                    sx={
                      selectedUser?._id === user._id
                        ? { bgcolor: "quaternary.main" }
                        : { bgcolor: "transparent" }
                    }
                  >
                    <ListItemIcon>
                      <Badge
                        overlap="circular"
                        variant="dot"
                        badgeContent=" "
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: onlineUser.includes(user._id)
                              ? "green"
                              : "gray",
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            border: "2px solid #16161a",
                          },
                        }}
                      >
                        <Avatar src={user.profilePic} />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" flexDirection="column">
                          <Typography variant="body1">
                            {user.fullName}
                          </Typography>
                          <Typography
                            variant="caption"
                            color={
                              onlineUser.includes(user._id)
                                ? "success.main"
                                : "text.secondary"
                            }
                          >
                            {onlineUser.includes(user._id)
                              ? "online"
                              : "offline"}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
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
