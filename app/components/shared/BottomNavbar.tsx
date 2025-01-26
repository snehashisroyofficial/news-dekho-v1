import React from "react";
import { Box, useTheme, useMediaQuery, IconButton } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import VideoIcon from "@mui/icons-material/PlayCircle";
import { useRouter } from "next/navigation";

const BottomNavbar: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <Box>
      {/* Fixed Bottom Bar for Mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#f5f5ff",
            p: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <IconButton
            onClick={() => handleNavigate("/")}
            sx={{ color: "#7b7a9f" }}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            onClick={() => handleNavigate("/video")}
            sx={{ color: "#7b7a9f" }}
          >
            <VideoIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default BottomNavbar;
