"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";

import {
  fetchTopTrendingPosts,
  topTrendingPost,
} from "../../Redux/Slice/article/trendingArticles";
import Image from "next/image";
import Link from "next/link";

const TrendingArticles = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    articles,
    loading,
    error,
    lastVisible,
    hasMore,
    fetchedLessThanLimit,
  } = useSelector((state: RootState) => state.topTrendingPostArticleReducer);

  useEffect(() => {
    dispatch(topTrendingPost());
    dispatch(fetchTopTrendingPosts({ limitCount: 4, startAfterDoc: null }));
  }, [dispatch]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 p-4 lg:p-10 ">
      <div className="lg:w-2/5 ">
        <h1 className="inline-block text-3xl font-semibold after:content-[''] after:w-full after:h-1 after:bg-black after:block after:mt-2 py-4">
          সেরা খবর
        </h1>
        <div className="w-full">
          {articles.map((item, idx) => (
            <Link key={idx} href={`/article/${item.id}`}>
              <h2 className=" text-xl md:text-2xl text-black hover:underline hover:text-red-800 border-b-2 py-4">
                {item.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:flex-1 ">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {articles.slice(0, 2).map((item, idx) => (
            <Link key={idx} href={`/article/${item.id}`} className="flex-1">
              <div className="flex flex-col justify-between bg-slate-200 h-full w-full overflow-hidden">
                <div className="h-72 overflow-hidden w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    height={1000}
                    width={1000}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h1 className="text-black text-lg lg:text-xl p-4 lg:p-4 font-bold hover:underline hover:text-red-800 line-clamp-3">
                  {item.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingArticles;
