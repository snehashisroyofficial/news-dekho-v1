"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllStories,
  resetStories,
} from "../../Redux/Slice/story/webstoriesSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { useRouter } from "next/navigation";

const StoryViewer: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { stories, loading, error } = useSelector(
    (state: RootState) => state.webstories
  );

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // Check if screen is larger than 'md'

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchAllStories());

    return () => {
      dispatch(resetStories());
    };
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (stories.length === 0) {
    return <div>No stories found.</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isDesktop ? "20px" : "8px",
      }}
    >
      {/* Horizontal Scrollable Container with hidden scrollbar */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          paddingBottom: "20px",
          width: "100%",
          justifyContent: "flex-start",
          // Hide scrollbar
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for webkit-based browsers
          },
          "-ms-overflow-style": "none", // Hide scrollbar for IE
          "scrollbar-width": "none", // Hide scrollbar for Firefox
        }}
      >
        {stories.map((story: any, index: any) => (
          <Box
            key={index}
            sx={{
              width: "200px", // Fixed width for images
              height: "300px", // Fixed height for images
              marginRight: "10px", // Space between images
              backgroundImage: `url(${story.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              position: "relative",
              cursor: "pointer",
              flexShrink: 0, // Prevent images from shrinking on smaller screens
            }}
            onClick={() => router.push(`/storyview?id=${story.id}`)}
          >
            {/* Line Indicator on top of each image */}
            <Box
              sx={{
                position: "absolute",
                top: "10px", // Position the line of indicators at the top
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {new Array(6).fill(null).map((_, indicatorIndex) => (
                <Box
                  key={indicatorIndex}
                  sx={{
                    width: "12px", // Width of each line indicator
                    height: "3px", // Height of each line indicator
                    backgroundColor:
                      indicatorIndex === currentStoryIndex ? "#f00" : "#aaa",
                  }}
                />
              ))}
            </Box>

            {/* Story Title */}
            <Box
              sx={{
                position: "absolute",
                bottom: "0px",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: "10px",
                borderRadius: "0px 0px 10px 10px",
              }}
            >
              <h1 className="inline-block text-sm font-semibold text-white text-center after:content-[''] after:w-full after:h-1 after:bg-black after:block after:mt-2">
                {story.title}
              </h1>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StoryViewer;
