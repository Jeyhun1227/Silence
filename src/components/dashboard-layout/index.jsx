import { useState } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
const Header = dynamic(() => import('./header'), {ssr: false});
const NavVertical = dynamic(() => import('./nav/NavVertical'), {ssr: false});

const DashboardLayout = ({ children, maxWidth, title }) => {
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => setOpenNav(!openNav);

  return (
    <Box sx={{ display: "flex" }}>
      <NavVertical open={openNav} onClose={toggleNav} />
      <Box sx={{ maxHeight: "100%", width: "100%" }}>
        <Header onToggleNav={toggleNav} />
        <Box
          component="main"
          sx={{
            display: "flex",
            p: { xs: 1.5, md: 3 },
            minHeight: "calc(100vh - 64px)",
            width: "100%",
            flexDirection: "column",
          }}
          maxWidth={maxWidth}
          margin="auto"
        >
          <Box sx={{ display: "flex", flex: 1 }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
