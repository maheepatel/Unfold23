import { Outlet } from "react-router-dom";
// import { Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";

const RootLayout = () => {
  return (
    <AnimatePresence>
      <Outlet />
    </AnimatePresence>
  );
};

export default RootLayout;
