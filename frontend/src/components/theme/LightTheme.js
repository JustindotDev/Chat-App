import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6246ea" }, // for Signup/Login Header and logo
    secondary: { main: "#6246ea" }, //for navbar
    tertiary: { main: "#2b2c34" }, // Text color
    background: {
      default: "#fffffe",
      paper: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#6246ea",
          borderRadius: "4px",
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          backgroundColor: "#d1d1e9", // you can change this per theme
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          color: "#2b2c34",
          fontWeight: "bold",
        },
        subheader: {
          color: "#2b2c34",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          borderColor: "#2b2c34",
          borderWidth: "1px",
        },
      },
    },
  },
});

export default lightTheme;
