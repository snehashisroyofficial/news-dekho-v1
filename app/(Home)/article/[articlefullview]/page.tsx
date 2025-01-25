"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Typography,
  Box,
  Alert,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import { fetchFullViewArticle } from "../../../Redux/Slice/article/fullViewArticleSlice";
import { AppDispatch, RootState } from "../../../Redux/store";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import AuthorImg from "../../../../public/assets/images/person.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArticleSuggestion from "@/app/components/ArticleSugestion/ArticleSuggestion";
import RecentPostComponent from "@/app/components/ArticleSugestion/RecentPostComponent";

const page: React.FC = ({ params }) => {
  const getCurrentUrl = () => {
    return window.location.href;
  };

  const id = params.articlefullview;

  console.log("here is id", id);

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const { article, loading, error } = useSelector(
    (state: RootState) => state.article
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchFullViewArticle(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <h1 className="font-noto-serif-bengali text-2xl">লোড হচ্ছে ......</h1>
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!article) {
    return <Typography>Article not found</Typography>;
  }

  // date calculation
  const miliSec =
    article.timestamp.seconds * 1000 + article.timestamp.nanoseconds / 1000000;

  const date = new Date(miliSec);
  const postDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });

  const handleCategoryClick = (categoryId: string | number) => {
    router.push(`/topic?id=${categoryId}`);
  };

  const handleWhatsAppShare = () => {
    const url = getCurrentUrl();
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      url
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFacebookShare = () => {
    const url = getCurrentUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const url = getCurrentUrl();
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}`;
    window.open(twitterUrl, "_blank");
  };

  const timestamp = article.timestamp.toDate(); // Convert Firestore Timestamp to Date
  const formattedTimestamp = timestamp.toISOString().slice(0, 19) + "+05:30";

  return (
    <>
      <div className="py-6">
        {/* top section */}
        <div className="w-full  flex flex-col lg:flex-row  relative">
          {/* left section */}
          <div className="lg:w-3/5  p-3 md:p-6 space-y-4">
            <div>
              <h1 className="text-xl md:text-4xl font-bold pb-4">
                {article.title}
              </h1>

              {/* published date */}
              <div className="border-y-2 w-full border-gray-200/70 py-4">
                <h2>{postDate}</h2>
              </div>

              {/* image or video */}
              <div className="py-6">
                {article.videoUrl ? (
                  <div>
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${
                        article.videoUrl.includes("youtube.com/shorts/")
                          ? article.videoUrl.split("/shorts/")[1]
                          : new URLSearchParams(
                              new URL(article.videoUrl).search
                            ).get("v")
                      }`}
                      title="Video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="w-full h-64 md:h-[500px]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      height={1000}
                      width={1000}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* description */}
              <p
                className="py-4 text-xl"
                dangerouslySetInnerHTML={{
                  __html: article.description || "কোন বিবরণ উপলব্ধ নয়।",
                }}
              ></p>

              <div
                className="flex flex-col md:flex-row items-center gap-4 bg-gray-100 border-2 border-gray-300 hover:border-red-300 hover:bg-red-100 rounded-lg overflow-hidden cursor-pointer group"
                style={{ maxHeight: "300px", height: "auto", padding: "8px" }} // Content-based height with max-height limit
              >
                <Avatar
                  alt={article.authorName || "News Prime Times"}
                  src={article.authorImage || AuthorImg}
                  sx={{
                    width: 60, // Set width
                    height: 60, // Set height to maintain a circle shape
                    ml: 2, // Margin right for spacing
                    border: "4px solid #dddddd", // Add border
                    borderRadius: "50%", // Ensure it remains circular (default is already circular)
                  }}
                />

                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {article.authorName || "News Prime Times"}
                  </Typography>
                  <Typography className="py-1 text-9xl">
                    {article.authorBio || "admin"}
                  </Typography>
                </Box>
              </div>

              {/* topic */}
              <div
                onClick={() => handleCategoryClick(article.id)}
                className="flex items-center gap-2 p-2 w-fit cursor-pointer "
              >
                <h2 className="font-bold">টপিক : </h2>
                <p className="">{article.topic}</p>
              </div>

              {/* share button */}
              <div className="flex items-center gap-4 justify-end  bg-white  ">
                <h2 className="text-xl text-center font-semibold  hidden md:inline-block ">
                  শেয়ার করুন :
                </h2>
                <div className="flex items-center justify-around gap-6 ">
                  <div
                    onClick={handleFacebookShare}
                    className="  cursor-pointer p-6 bg-blue-600 text-white  w-[40px] h-[40px] flex items-center justify-center"
                  >
                    <FacebookIcon fontSize="large" />
                  </div>
                  <div
                    onClick={handleTwitterShare}
                    className="cursor-pointer p-6 bg-black  text-white   w-[40px] h-[40px] flex items-center justify-center"
                  >
                    <XIcon fontSize="large" />
                  </div>
                  <div
                    onClick={handleWhatsAppShare}
                    className="cursor-pointer p-6 bg-green-600 text-white  w-[40px] h-[40px] flex items-center justify-center"
                  >
                    <WhatsAppIcon fontSize="large" />
                  </div>
                </div>
              </div>
            </div>

            {/* bottom section */}
            <div>
              <ArticleSuggestion />
            </div>
          </div>

          {/* right section */}
          <div className="flex-1 h-fit  p-6 sticky top-10  ">
            <RecentPostComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
