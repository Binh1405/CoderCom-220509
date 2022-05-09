import { Box } from "@mui/system";
import React from "react";
import logoImg from "../logo.png";
import { Link as RouterLink } from "react-router-dom";

const Logo = ({ disabledLink = false, sx }) => {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );
  if (disabledLink) {
    return <> {logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
};

export default Logo;
