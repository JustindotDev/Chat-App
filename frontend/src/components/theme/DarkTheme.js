import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7f5af0" }, // for Signup/Login Header and logo
    secondary: { main: "#16161a" }, //for navbar
    tertiary: { main: "#94a1b2" }, // Text color
    quaternary: { main: "#3a3a40" }, // for selected user in the chat
    background: {
      default: "#16161a",
      paper: "#1d1d1d",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#7f5af0",
          borderRadius: "4px",
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          backgroundColor: "#16161a", // you can change this per theme
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          color: "#fffffe",
          fontWeight: "bold",
        },
        subheader: {
          color: "#94a1b2",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          borderColor: "#010101",
          borderWidth: "1px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset", // same as your bg
            WebkitTextFillColor: "#fffffe",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
  },
});

export default darkTheme;
