import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

const BlankLayout = () => {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Logo sx={{ width: 70, height: 70, mb: 5 }} />
      <Outlet />
    </Stack>
  );
};

export default BlankLayout;
