import { Box } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box component="header">
        <Header />
      </Box>

      <Box component="main" sx={{ flex: 1, backgroundColor: "#ffffff" }}>
        <Outlet />
      </Box>
      <Box component={"footer"}>
        <Footer />
      </Box>
    </Box>
  );
};

export default AppLayout;
