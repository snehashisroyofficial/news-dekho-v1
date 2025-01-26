"use client";

import React, { useState } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Sidebar from "../../Widgets/Sidebar";
import HorizontalTagScrollList from "./HorizontalTagScrollList";
import VideoIcon from "@mui/icons-material/PlayCircle";
import SearchIcon from "@mui/icons-material/Search";
import Search from "../SearchBar";
import HomeIcon from "@mui/icons-material/Home"; // Import the Home icon
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface TitleBarProps {
  title: string;
  onBackClick?: () => void;
  onNotificationClick?: () => void;
}

const NavBar: React.FC<TitleBarProps> = ({
  title,
  onBackClick = () => {},
  onNotificationClick = () => {},
}) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [getModal, closeModal] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();

  const handleNotificationClick = () => {
    router.push("/notification");
  };

  const handleVideoClick = () => {
    router.push("/video");
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <>
      {getModal && <Search closeModal={closeModal} />}
      <div className="md:hidden">
        <Sidebar openSideBar={openSidebar} setOpenSidebar={setOpenSidebar} />
      </div>

      <Box
        sx={{
          position: isMobile ? "sticky" : "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#991B1B",
          zIndex: 50,
          width: "100%",
          p: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 0,
          boxShadow: !isMobile ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        {/* Desktop Title Bar */}
        {!isMobile && (
          <Box
            sx={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "#991B1B",
              zIndex: 50,
              width: "100%",
              p: 0,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              px: 2,
            }}
          >
            {/* Home Icon */}
            <IconButton onClick={handleHomeClick} sx={{ color: "#E8E8FDFF" }}>
              <HomeIcon />
            </IconButton>

            {/* Logo */}
            <div>
              <Link href={"/"}>
                <div className=" max-w-52">
                  <Image
                    src="/assets/images/logo.png"
                    height={1000}
                    width={1000}
                    alt="logo"
                  />
                </div>
              </Link>
            </div>

            <HorizontalTagScrollList />

            <IconButton
              onClick={() => closeModal(true)}
              sx={{ color: "#E8E8FDFF", fontSize: "large" }}
            >
              <SearchIcon />
            </IconButton>

            <IconButton onClick={handleVideoClick} sx={{ color: "#E8E8FDFF" }}>
              <VideoIcon />
            </IconButton>

            <IconButton
              onClick={handleNotificationClick}
              sx={{ color: "#E6E5FFFF" }}
            >
              <NotificationsIcon />
            </IconButton>
          </Box>
        )}

        {/* Mobile Title Bar */}
        {isMobile && (
          <Box
            sx={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "#991B1B",
              zIndex: 1004,
              width: "100%",
              paddingTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => setOpenSidebar(true)}
              sx={{ color: "#FFFFFFFF" }}
            >
              <MenuIcon />
            </IconButton>

            <div>
              <Link href={"/"}>
                <Image
                  src="/assets/images/logo.png"
                  height={1000}
                  width={1000}
                  alt="logo"
                />
              </Link>
            </div>

            <IconButton
              onClick={() => closeModal(true)}
              sx={{ color: "#E8E8FDFF", fontSize: "large" }}
            >
              <SearchIcon />
            </IconButton>

            <IconButton
              onClick={handleNotificationClick}
              sx={{ color: "#FFFFFFFF" }}
            >
              <NotificationsIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      <HorizontalTagScrollList />
    </>
  );
};

export default NavBar;
