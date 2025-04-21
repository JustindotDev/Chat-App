import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSignup } = useAuthStore();

  const validationForm = () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      return toast.error(" All field is required");
    }

    if (formData.password.length < 6) {
      return toast.error(" Password must be at least 6 characters");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validationForm();
    if (success === true) {
      signUp(formData, navigate);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "25rem",
          height: "80%",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ChatBubbleIcon
          sx={{ fontSize: "2.5rem", mt: 2, color: "primary.main" }}
        />
        <CardHeader
          title="Sign Up"
          sx={{
            "& .MuiCardHeader-title": {
              color: "primary.main",
              fontWeight: "bold",
              fontSize: "1.5rem",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl
            sx={{
              width: "18rem",
              gap: 2,
            }}
            variant="outlined"
          >
            <TextField
              label="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </FormControl>
          </FormControl>
        </Box>
        <CardActions sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            fullWidth
            loading={isSignup}
            loadingPosition="start"
            sx={{ width: "18rem", mt: 1 }}
            variant="contained"
            onClick={handleSubmit}
          >
            {" "}
            Sign Up{" "}
          </Button>

          <Button
            sx={{
              backgroundColor: "transparent",
              mt: 1,
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            forgot password?
          </Button>
          <Typography sx={{ color: "gray", fontSize: "12px" }}>
            Already have an account?{" "}
            <Typography
              component="span"
              sx={{
                color: "gray",
                fontSize: "12px",
                cursor: "pointer",
                display: "inline-block",
                "&:hover": {
                  textDecoration: "underline",
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </Typography>
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
};

export default SignupPage;
