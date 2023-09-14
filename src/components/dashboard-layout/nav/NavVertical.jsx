import PropTypes from "prop-types";
import { useEffect } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { Box, Stack, Drawer, Button } from "@mui/material";
// hooks
import { useResponsive } from "hooks/useResponsive";
// config
import { NAV } from "config/index";
// components
import Scrollbar from "../../scrollbar";
import NavSectionVertical from "./NavSectionVertical";
//
import navConfig from "./nav-config";
import { useUser } from "feature/auth/context";
import Account from "./Account";
import { indigo } from "@mui/material/colors";
import * as authApi from "@api/auth";

// ----------------------------------------------------------------------

NavVertical.propTypes = {
  open: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function NavVertical({ open, onClose }) {
  const router = useRouter();
  const user = useUser();
  const { tab } = useResponsive();

  const handleLogout = async () => {
    await authApi.logout();
    router.push("/login");
  };

  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [router.pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
        bgcolor: indigo[700],
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Account user={user} />
      </Box>
      <NavSectionVertical data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2.5 }}>
        <Button variant="contained" color="inherit" fullWidth onClick={handleLogout} sx={{ mt: 10 }}>
          Log out
        </Button>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      {!tab ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: "transparent",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
