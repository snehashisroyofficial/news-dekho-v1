"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import {
  fetchTopRecentPosts,
  resetTopRecentPosts,
} from "../../Redux/Slice/banner/highlightTopSlice";

import {
  fetchArticles,
  resetArticles,
} from "../../Redux/Slice/article/articlesSlice";

import {
  fetchRecentPosts,
  resetRecentPosts,
} from "../../Redux/Slice/article/recentPostArticlesSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

// article ts
interface FullViewArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  contentType: string;
  image: string;
  status: string;
  tag: string;
  tagId: string;
  tagName: string;
  timestamp: string;
  topic: string;
  topicId: string;
  videoUrl: string;
}

const HomePageBanner: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  //   main post
  const {
    articles: mainPost,
    loading: mainPostLoading,
    error: mainPostError,
  } = useSelector((state: RootState) => state.toprecentPostArticlesReducer);

  //   main post bottom articles
  const {
    articles,
    loading,
    error,
    lastVisible,
    hasMore,
    fetchedLessThanLimit,
  } = useSelector((state: RootState) => state.articles);

  // right side articles
  const {
    articles: rightSideArticles,
    loading: rightSideLoading,
    error: rightSideError,
    lastVisible: rightSideLastVisible,
    hasMore: rightSideHasMore,
    fetchedLessThanLimit: rightSideFetchedLessThanLimit,
  } = useSelector((state: RootState) => state.recentPostArticles);

  const [selectedArticle, setSelectedArticle] =
    useState<FullViewArticle | null>(null);

  useEffect(() => {
    dispatch(resetArticles());
    dispatch(fetchArticles({ limitCount: 6, startAfterDoc: null }));
  }, [dispatch]);

  //   main post
  useEffect(() => {
    dispatch(fetchTopRecentPosts({ limitCount: 1, startAfterDoc: null }));

    return () => {
      dispatch(resetTopRecentPosts());
    };
  }, [dispatch]);

  // right side
  useEffect(() => {
    dispatch(resetRecentPosts());
    dispatch(fetchRecentPosts({ limitCount: 3, startAfterDoc: null }));
  }, [dispatch]);

  //   global link
  const handleArticleClick = (id: string) => {
    router.push(`/article?id=${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="  flex flex-col md:flex-row  items-start justify-between gap-16  px-4 py-6 md:py-10 ">
      {/* left side area  */}
      <div className="md:w-2/3 space-y-10">
        {/* image big  */}
        <div
          onClick={() => handleArticleClick(mainPost[0].id)}
          className="w-full hidden md:flex relative h-96 md:h-[600px] group overflow-hidden rounded-2xl "
        >
          <span className="w-full h-full bg-gradient-to-t from-black/60 to-transparent absolute z-10"></span>
          <Image
            src={mainPost[0]?.image}
            alt={mainPost[0]?.title}
            height={1000}
            width={1000}
            className="w-full h-full object-cover group-hover:scale-105 transition ease-in-out duration-300"
          />
          <h1 className="absolute z-20 bottom-8 left-4 text-2xl md:text-5xl text-white p-4 leading-relaxed">
            {mainPost[0]?.title}
          </h1>
        </div>

        {/* down grid  */}
        <div className="w-full grid  grid-cols-1 lg:grid-cols-2 gap-10">
          {articles.map((item, idx) => (
            <>
              <div
                key={idx}
                onClick={() => handleArticleClick(item.id)}
                className="flex  flex-col md:flex-row  items-center  group cursor-pointer max-h-96 lg:max-h-32 h-full  "
              >
                <div className="w-full md:w-2/5 h-full overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    height={1000}
                    width={1000}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300 ease-in-out"
                  />
                </div>

                <h1 className="text-xl lg:text-lg flex-1 p-4">{item.title}</h1>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* right side area */}
      <div className="md:flex-1 space-y-10">
        {rightSideArticles.map((item, idx) => (
          <div
            onClick={() => handleArticleClick(item.id)}
            key={idx}
            className="space-y-3 group overflow-hidden"
          >
            <div className="max-h-64  overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.title}
                height={1000}
                width={1000}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300 ease-in-out"
              />
            </div>
            <h1 className="text-2xl">{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageBanner;
