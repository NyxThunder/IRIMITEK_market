import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f4f4f4",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          borderRadius: "8px",
          padding: "8px 16px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: "500",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 576,   //540
      sm: 768,  // 720
      md: 992,    //960
      lg: 1200, //1140
    },
  },
});

export default theme;
