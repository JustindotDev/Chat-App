import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useAuthStore } from "../store/useAuthStore.js";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Divider from "@mui/material/Divider";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        mt: "1.5rem",
      }}
    >
      <Card
        sx={{
          width: "32%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CardHeader
          title="Profile"
          subheader="Your profile information"
          sx={{ p: 0, mb: 0.5, mt: 1.5 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: "100px",
            height: "100px",
            alignItems: "center",
            mb: "2.3rem",
          }}
        >
          <CardMedia
            component="img"
            image={selectedImage || authUser.profilePic || "/profile.jpg"}
            alt="User profile picture"
            sx={{
              borderRadius: "50%",
              height: "100px",
              width: "100px",
              border: "4px solid white",
            }}
          />
          <Button
            component="label"
            disableRipple
            sx={{
              bgcolor: "white",
              position: "absolute",
              left: "4.2rem",
              right: "0",
              top: "4.1rem",
              bottom: "0",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              minWidth: 0,
              "&:active": {
                bgcolor: "rgb(207, 205, 205)",
              },
            }}
          >
            <AddAPhotoIcon
              sx={{
                color: "#2b2c34",
                height: "16px",
                borderRadius: "50%",
              }}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </Button>
          <Box width={"25rem"} mt={1}>
            {isUpdatingProfile ? (
              <Typography sx={{ fontSize: "12px", color: "tertiary.main" }}>
                Uploading...
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "12px", color: "tertiary.main" }}>
                Click the camera icon to update your photo.
              </Typography>
            )}
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
          <Box display={"flex"} alignItems="center" mb={"4px"} gap={"1px"}>
            <PermIdentityIcon fontSize="small" />
            <Typography variant="body2">Full Name</Typography>
          </Box>
          <Paper
            variant="outlined"
            sx={{
              bgcolor: "transparent",
              width: "25rem",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              pl: 2,
              boxSizing: "border-box",
              fontFamily: "roboto",
              mb: "10px",
            }}
          >
            {authUser?.fullName}
          </Paper>
          <Box display={"flex"} alignItems={"center"} mb={"4px"} gap={"2px"}>
            <MailOutlineIcon fontSize="small" />
            <Typography variant="body2">Email</Typography>
          </Box>
          <Paper
            variant="outlined"
            sx={{
              bgcolor: "transparent",
              width: "25rem",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              pl: 2,
              boxSizing: "border-box",
              fontFamily: "roboto",
            }}
          >
            {authUser?.email}
          </Paper>
        </Box>
        <Box sx={{ width: "60%", mt: 2, mb: 1 }}>
          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "#010101", // Apply to the actual lines
              },
              fontFamily: "roboto",
              fontSize: "12px",
              color: "tertiary.main",
            }}
          >
            status
          </Divider>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"24rem"}
          fontSize={"14px"}
          fontFamily={"roboto"}
          mb={0.5}
        >
          <Typography sx={{ fontSize: "14px", fontFamily: "roboto" }}>
            Member Since
          </Typography>
          {authUser.createdAt?.split("T")[0]}
        </Box>
        <Box sx={{ width: "24.5rem" }}>
          <Divider
            sx={{
              borderColor: "#010101",
            }}
          ></Divider>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"24rem"}
          fontFamily={"roboto"}
          mb={0.5}
          mt={1}
        >
          <Typography sx={{ fontSize: "14px", fontFamily: "roboto" }}>
            Account Status
          </Typography>
          <Typography
            sx={{
              color: "green",
              fontStyle: "italic",
              fontSize: "14px",
              fontFamily: "roboto",
            }}
          >
            Active
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfilePage;
