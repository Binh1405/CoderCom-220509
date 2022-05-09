import React from "react";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import customizeComponents from "./customizations";

const PRIMARY = {
  lighter: "#2ecc71",
  light: "#2ecc71",
  main: "#1abc9c",
  dark: "#16a085",
  darker: "#2ecc49",
  contrastText: "#fff",
};

const SECONDARY = {
  lighter: "#3498db",
  light: "#2980b9",
  main: "#9b59b6",
  dark: "#8e44ad",
  darker: "#7e44ad",
  contrastText: "#fff",
};

const SUCCESS = {
  lighter: "#f1c40f",
  light: "#f39c12",
  main: "#e67e22",
  dark: "#d35400",
  darker: "#e74c3c",
  contrastText: "#fff",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#FEF6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919eab", 0.08),
  500_12: alpha("#919eab", 0.12),
  500_16: alpha("#919eab", 0.16),
  500_24: alpha("#919eab", 0.24),
  500_32: alpha("#919eab", 0.32),
  500_48: alpha("#919eab", 0.48),
  500_56: alpha("#919eab", 0.56),
  500_80: alpha("#919eab", 0.8),
};

const ThemeProvider = ({ children }) => {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[300] },
      background: { paper: "#fff", default: "#fff", neutral: GREY[200] },
      action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    shape: { borderRadius: 8 },
  };
  const theme = createTheme(themeOptions);
  theme.components = customizeComponents(theme);
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
