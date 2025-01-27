"use client";

import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useSwipeable } from "react-swipeable";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ColorThief from "colorthief"; // Import color-thief
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RefreshIcon from "@mui/icons-material/Refresh"; // Import the refresh icon
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // Import Play icon
import PauseIcon from "@mui/icons-material/Pause"; // Import Pause icon

import { useDispatch, useSelector } from "react-redux";
import { fetchStoryData } from "../../Redux/Slice/story/storySlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { useRouter, useSearchParams } from "next/navigation";

const StoryViewer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");

  const { status, story, loading, error } = useSelector(
    (state: any) => state.myStory
  );

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [bgColor, setBgColor] = useState<string>(""); // Store the background color

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const storyId = urlParams.get("id"); // Get the id from the URL

  // Spring animation for the progress bar
  const { width } = useSpring({
    width: `${progress}%`,
    config: { duration: 100 },
  });

  useEffect(() => {
    if (storyId) {
      dispatch(fetchStoryData(storyId)); // Fetch the story based on the id from URL
    }
  }, [dispatch, storyId]);

  // Extract dominant color when currentStoryIndex changes
  useEffect(() => {
    if (story.length > 0 && story[currentStoryIndex]?.imageUrl) {
      const img = new Image();
      img.src = story[currentStoryIndex].imageUrl;

      img.onload = () => {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`); // Set background color
      };
    }
  }, [currentStoryIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (!isPaused) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 2; // Increase progress every 100ms
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, currentStoryIndex]);

  const nextStory = () => {
    setProgress(0);

    if (currentStoryIndex == story.length - 1) {
      setCurrentStoryIndex(currentStoryIndex);
    } else {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const prevStory = () => {
    setProgress(0);
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextStory,
    onSwipedRight: prevStory,
    preventScrollOnSwipe: true,
  });

  // Create an animated spring for the popup animation
  const springStyles = useSpring({
    transform: "translateY(0)", // Final position
    opacity: 1, // Fully visible
    from: {
      transform: "translateY(100px)", // Start from below the screen
      opacity: 0, // Start as invisible
    },
    config: { tension: 300, friction: 300 }, // Adjust animation speed and smoothness
  });

  const handlePausePlayToggle = () => {
    setIsPaused((prev) => !prev); // Toggle play/pause state
  };

  const handleback = () => {
    router.back();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (story.length === 0) {
    return <div>No story found.</div>;
  }

  return (
    <div {...handlers}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: `linear-gradient(to bottom, #3D3737FF, #4A4A4AFF)`,
        }}
      >
        {isDesktop ? (
          <IconButton
            onClick={prevStory}
            sx={{
              background: "#FFFFFFFF",
              color: "rgba(0, 0, 0, 0.7)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              "&:hover": {
                background: "#FFFFFFFF",
              },
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        ) : null}

        <Box sx={{ width: "20px" }}></Box>
        <Box
          {...handlers}
          sx={{
            position: "relative",
            width: isDesktop ? "420px" : "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backgroundImage: `url(${story[currentStoryIndex].imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Timeline Progress Indicator */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              display: "flex",
              width: isDesktop ? "320px" : "100vw",
              justifyContent: "space-between",
              zIndex: 2,
              padding: "10px",
            }}
          >
            {story.map((_, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  height: "5px",
                  background: index < currentStoryIndex ? "#f00" : "#aaa",
                  margin: "0 2px",
                  position: "relative",
                }}
              >
                {index === currentStoryIndex && (
                  <animated.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "5px",
                      background: "#f00",
                      width,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Story Layout */}
          <Box
            sx={{
              position: "relative",
              width: isDesktop ? "420px" : "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "20px",
              paddingInline: "20px",
              justifyContent: "end",
              alignItems: "center",
              backgroundImage: `linear-gradient(to bottom, transparent, #0B0B0BFF), url(${story[currentStoryIndex].imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={(e) => {
              // Check if the click is on the left or right side of the box
              const boxWidth = e.currentTarget.offsetWidth;
              const clickPosition = e.clientX;

              if (clickPosition < boxWidth / 2) {
                prevStory(); // Left side click
              } else {
                nextStory(); // Right side click
              }
            }}
          >
            {/*back */}
            <IconButton
              onClick={handleback}
              sx={{
                position: "absolute",
                top: "3%",
                left: "10%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                color: "#000",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
            </IconButton>

            {/* Play/Pause Button */}
            <IconButton
              onClick={handlePausePlayToggle}
              sx={{
                position: "absolute",
                top: "3%",
                left: "90%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                color: "#000",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              {isPaused ? (
                <PlayArrowIcon sx={{ color: "#ffffff" }} />
              ) : (
                <PauseIcon sx={{ color: "#ffffff" }} />
              )}
            </IconButton>
            <Box
              sx={{
                width: "90%",
                height: "5px",
                backgroundColor: "#991818FF",
                marginBottom: "20px",
              }}
            ></Box>
            <animated.div style={springStyles}>
              <h1 className="inline-block text-3xl font-semibold text-white text-center after:content-[''] after:w-full after:h-1 after:block after:mt-2">
                {story[currentStoryIndex].title}
              </h1>
            </animated.div>
          </Box>

          {/* Navigation Controls */}
          <Box
            sx={{
              position: "absolute",
              bottom: "10%",
              display: "flex",
              justifyContent: "space-between",
              width: isDesktop ? "320px" : "100%",
              px: 2,
              zIndex: 2,
            }}
          ></Box>
        </Box>
        <Box sx={{ width: "20px" }}></Box>

        {/* Conditionally render the refresh or forward button */}
        {isDesktop ? (
          currentStoryIndex === story.length - 1 ? (
            <IconButton
              onClick={() => window.location.reload()}
              sx={{
                background: "#FFFFFFFF",
                color: "rgba(0, 0, 0, 0.7)",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                "&:hover": {
                  background: "#FFFFFFFF",
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={nextStory}
              sx={{
                background: "#FFFFFFFF",
                color: "rgba(0, 0, 0, 0.7)",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                "&:hover": {
                  background: "#FFFFFFFF",
                },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )
        ) : null}
      </Box>
    </div>
  );
};

export default StoryViewer;
