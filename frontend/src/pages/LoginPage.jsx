import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { logIn, isLoggingIn } = useAuthStore();

  const validationForm = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      return toast.error(" All field is required");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validationForm();

    if (success === true) {
      logIn(formData, navigate);
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
          sx={{ fontSize: "2.5rem", mt: 7, color: "primary.main" }}
        />
        <CardHeader
          title="Sign In"
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
            gap: 2,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ width: "18rem" }}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={{ width: "18rem" }}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Box>
        <CardActions sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            fullWidth
            loading={isLoggingIn}
            loadingPosition="start"
            sx={{ width: "18rem", mt: 1 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Sign In
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
            Don't have an account?{" "}
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
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Typography>
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
};

export default LoginPage;
