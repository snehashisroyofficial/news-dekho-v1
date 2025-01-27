"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { fetchTopics } from "../../Redux/Slice/nested/topicsSlice";
import { fetchArticlesByTopic } from "../../Redux/Slice/nested/articlesSlice";
import { AppDispatch, RootState } from "../../Redux/store";

import icon from "../assets/icon.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TopTopics = ({ topicTitle1, topicTitle2 }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {
    topCategories,
    loading: topicsLoading,
    error: topicsError,
  } = useSelector((state: RootState) => state.topCategory);
  const {
    byTopicId,
    loading: articlesLoading,
    error: articlesError,
  } = useSelector((state: RootState) => state.nestedarticles);

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  // Trigger articles fetch for each topic
  useEffect(() => {
    if (topCategories.length > 0) {
      topCategories.forEach((topic) => {
        dispatch(fetchArticlesByTopic(topic.id));
      });
    }
  }, [dispatch, topCategories]);

  const handleArticleClick = (articleId: string) => {
    router.push(`/article?id=${articleId}`);
  };

  return (
    <div className="font-noto-serif-bengali  ">
      <Box
        sx={{
          paddingX: 2,
          paddingY: 8,
        }}
      >
        {topicsLoading && <></>}
        {topicsError && (
          <Typography color="error" variant="body2">
            Error: {topicsError}
          </Typography>
        )}
        {!topicsLoading && !topicsError && topCategories.length === 0 && (
          <Typography variant="body2">No topics available</Typography>
        )}

        {!topicsLoading && !topicsError && topCategories.length > 0 && (
          <div className="grid  grid-cols-1 md:grid-cols-2  gap-6 p-0 lg:px-4">
            {topCategories.map((topic, idx) => (
              <>
                {topic.topic == topicTitle1 || topic.topic == topicTitle2 ? (
                  <div key={idx} className="">
                    <h1 className="inline-block text-3xl font-semibold after:content-[''] after:w-full after:h-1 after:bg-black after:block after:mt-2">
                      {topic.topic}
                    </h1>

                    <div className=" space-y-6 py-16  ">
                      {byTopicId[topic.id]?.length ? (
                        byTopicId[topic.id]?.map((article, idx) => (
                          <>
                            <div
                              onClick={() => handleArticleClick(article.id)}
                              key={article.id}
                              className="flex flex-col md:flex-row md:items-center gap-4   shadow-md border bg-white cursor-pointer group"
                            >
                              <div className="h-40 overflow-hidden w-full md:w-1/3">
                                <Image
                                  src={article.image}
                                  alt={article.title}
                                  height={1000}
                                  width={1000}
                                  className="w-full h-full object-cover group-hover:scale-125 ease-in-out transition duration-300"
                                />
                              </div>
                              <div className=" t flex-1 p-4 ">
                                {/* <p className={`p-1 rounded-xl text-sm   w-fit`}>
                                  {article.topic}
                                </p> */}
                                <p className={`p-1 rounded-xl text-sm   w-fit`}>
                                  {article.category}
                                </p>
                                <h1 className="text-xl font-semibold  ">
                                  {article.title}
                                </h1>
                              </div>
                            </div>
                          </>
                        ))
                      ) : (
                        <h1 className="text-xl text-center ">
                          এই বিভাগের অধীনে কোনো পোস্ট পাওয়া যায়নি।
                        </h1>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};

export default TopTopics;
