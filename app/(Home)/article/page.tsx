"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Avatar, Typography } from "@mui/material";
import { fetchFullViewArticle } from "../../Redux/Slice/article/fullViewArticleSlice";
import { AppDispatch, RootState } from "../../Redux/store";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import AuthorImg from "../../../public/assets/images/person.png";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import ArticleSuggestion from "@/app/components/ArticleSugestion/ArticleSuggestion";
import RecentPostComponent from "@/app/components/ArticleSugestion/RecentPostComponent";

const ArticleFullView: React.FC = () => {
  const getCurrentUrl = (): string => {
    return window.location.href;
  };

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  // Check if article exists before proceeding
  if (!article) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Typography variant="h6">Article not found</Typography>
      </div>
    );
  }
  // Safely calculating timestamp
  const miliSec =
    (article?.timestamp?.seconds || 0) * 1000 +
    (article?.timestamp?.nanoseconds || 0) / 1000000;

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
    const message = `${article?.title}\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFacebookShare = () => {
    const url = getCurrentUrl();
    const message = `${article?.title}\n${url}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&quote=${encodeURIComponent(message)}`;
    window.open(facebookUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const url = getCurrentUrl();
    const message = `${article?.title}\n${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      message
    )}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="py-6">
      <div className="w-full flex flex-col lg:flex-row relative">
        <div className="lg:w-3/5 p-3 md:p-6 space-y-4">
          <div>
            <h1 className="text-xl md:text-4xl font-bold pb-4">
              {article?.title}
            </h1>
            <div className="border-y-2 w-full border-gray-200/70 py-4">
              <h2>{postDate}</h2>
            </div>

            <div className="py-6">
              {article?.videoUrl ? (
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
                    src={
                      article?.image ||
                      "https://plus.unsplash.com/premium_photo-1682310096066-20c267e20605?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={article?.title || "thumbnail"}
                    height={1000}
                    width={1000}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            <p
              className="py-4 text-xl"
              dangerouslySetInnerHTML={{
                __html: article?.description || "কোন বিবরণ উপলব্ধ নয়।",
              }}
            ></p>

            <div
              className="font-noto-serif-bengali flex flex-col md:flex-row items-center gap-4 bg-gray-100 border-2 border-gray-300 hover:border-red-300 hover:bg-red-100 rounded-lg overflow-hidden cursor-pointer group"
              style={{ maxHeight: "300px", height: "auto", padding: "8px" }}
            >
              <Avatar
                alt={article?.authorName || "News Prime Times"}
                src={article?.authorImage || "/assets/images/person.png"}
                sx={{
                  width: 60,
                  height: 60,
                  ml: 2,
                  border: "4px solid #dddddd",
                  borderRadius: "50%",
                }}
              />
              <div>
                <h1 className="font-bold text-lg">
                  {article?.authorName || "News Prime Times"}
                </h1>
                <h3 className="text-lg">{article?.authorBio || "admin"}</h3>
              </div>
            </div>

            <div
              onClick={() => handleCategoryClick(article.id)}
              className="flex items-center gap-2 p-2 w-fit cursor-pointer"
            >
              <h2 className="font-bold">টপিক : </h2>
              <p>{article?.topic}</p>
            </div>

            <div className="flex items-center gap-4 justify-end bg-white">
              <h2 className="text-xl text-center font-semibold hidden md:inline-block">
                শেয়ার করুন :
              </h2>
              <div className="flex items-center justify-around gap-6">
                <div
                  onClick={handleFacebookShare}
                  className="cursor-pointer p-6 bg-blue-600 text-white w-[40px] h-[40px] flex items-center justify-center"
                >
                  <FacebookIcon fontSize="large" />
                </div>
                <div
                  onClick={handleTwitterShare}
                  className="cursor-pointer p-6 bg-black text-white w-[40px] h-[40px] flex items-center justify-center"
                >
                  <XIcon fontSize="large" />
                </div>
                <div
                  onClick={handleWhatsAppShare}
                  className="cursor-pointer p-6 bg-green-600 text-white w-[40px] h-[40px] flex items-center justify-center"
                >
                  <WhatsAppIcon fontSize="large" />
                </div>
              </div>
            </div>
          </div>

          <ArticleSuggestion />
        </div>

        <div className="flex-1 h-fit p-6 sticky top-10">
          <RecentPostComponent />
        </div>
      </div>
    </div>
  );
};

export default ArticleFullView;
