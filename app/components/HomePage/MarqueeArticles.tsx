"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { fetchTop3Articles } from "../../Redux/Slice/article/bakingArticlesSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { useRouter } from "next/navigation";

const MarqueeArticles = () => {
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.bakingArticles
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is mobile

  useEffect(() => {
    dispatch(fetchTop3Articles());
  }, [dispatch]);

  const handleArticleClick = (articleId: string) => {
    router.push(`/article/${articleId}`);
  };

  return (
    <>
      {/* Inline styles for animations */}
      <style>
        {`
    @keyframes verticalMarquee {
      0% { transform: translateY(0); }
      100% { transform: translateY(-100%); }
    }
    @keyframes marquee {
      0% {
        transform: translateX(10); /* Start at the beginning */
      }
      100% {
        transform: translateX(-40%); /* Scroll to the left */
      }
    }
  `}
      </style>
      <div>
        {/* Breaking News Section */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row", // Arrange items horizontally
            justifyContent: "space-between", // Adjust spacing between texts
            alignItems: "center", // Vertically center the texts
            height: "40px",
            backgroundColor: "#FFFDE2FF", // Light background color
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/reticular-tissue.png")',
          }}
        >
          <Box
            sx={{
              width: "20%",
              background: "#FCC510FF",

              overflow: "hidden",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: isMobile ? 12 : 18,
                  fontWeight: "bold",
                  color: "#000",
                  textAlign: "center",
                  fontFamily: "Roboto",
                }}
              >
                BREAKING NEWS
              </Typography>
            </Box>
          </Box>

          {/* Scrolling Articles Section */}
          <Box
            sx={{
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              display: "flex", // Enable flexbox layout
              overflow: "hidden",
              width: "80%",
              position: "relative",
            }}
          >
            {error && (
              <Typography color="error" variant="body2">
                Error: {error}
              </Typography>
            )}
            {!loading && !error && articles.length === 0 && (
              <Typography
                variant="body2"
                sx={{ color: "#FFF", fontFamily: "Noto Serif Bengali" }}
              >
                No articles available
              </Typography>
            )}
            {!loading && !error && articles.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  animation: "marquee 20s linear infinite", // Animation for scrolling text
                  whiteSpace: "nowrap",
                }}
              >
                {articles.map((article) => (
                  <Typography
                    onClick={() => handleArticleClick(article.id)}
                    className="hover:text-blue-600 hover:"
                    key={article.id}
                    variant="h6"
                    sx={{
                      color: "#0D0D0DFF",
                      fontSize: 16,
                      marginRight: 1,
                      display: "inline-block",
                      fontFamily: "Noto Serif Bengali",
                    }}
                  >
                    {article.title} |
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default MarqueeArticles;
