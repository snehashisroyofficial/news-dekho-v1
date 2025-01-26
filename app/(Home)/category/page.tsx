"use client";
import React, { useEffect, useCallback, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import {
  fetchArticles,
  resetArticles,
} from "../../Redux/Slice/article/articlesSlice";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

import debounce from "lodash/debounce";

import icon from "../../assets/icon.jpeg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryView: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {
    articles,
    loading,
    error,
    lastVisible,
    hasMore,
    fetchedLessThanLimit,
  } = useSelector((state: RootState) => state.articles);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    dispatch(resetArticles());
    dispatch(
      fetchArticles({ limitCount: 10, startAfterDoc: null, categoryId: id })
    );
  }, [dispatch, id]);

  const loadMoreProducts = useCallback(() => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      dispatch(
        fetchArticles({
          limitCount: 10,
          startAfterDoc: lastVisible,
          categoryId: id,
        })
      ).finally(() => setLoadingMore(false));
    }
  }, [dispatch, hasMore, loadingMore, lastVisible, id]);

  const handleScroll = debounce(() => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const maxScrollPosition = document.documentElement.offsetHeight - 300;

    if (scrollPosition >= maxScrollPosition) {
      loadMoreProducts();
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (fetchedLessThanLimit) {
      setShowSnackbar(true);
    }
  }, [fetchedLessThanLimit]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleArticleClick = (articleId: string) => {
    router.push(`/article/${articleId}`);
  };

  if (loading) {
    return (
      <div className="h-screen text-2xl font-bold w-full flex justify-center items-center">
        লোডিং হচ্ছে...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="h-screen  w-full flex flex-col justify-center items-center gap-4 text-center">
        <h2 className="font-semibold text-xl lg:text-4xl">
          কোনও আর্টিকেল পাওয়া যায়নি
        </h2>
        <p className="text-sm">
          দুঃখিত, বর্তমানে এই বিভাগে কোনও আর্টিকেল নেই। নতুন আর্টিকেলগুলি পাওয়া
          গেলে, এখানে প্রদর্শিত হবে।
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-2  lg:p-6 font-noto-serif-bengali">
        <div className="flex items-center flex-col md:flex-row  gap-6">
          {articles.map((item, idx) => (
            <div
              key={idx}
              className="max-w-96  border-2 border-red-100 rounded-xl p-4 flex flex-col  justify-between gap-4"
            >
              <div className="w-full h-64 rounded-xl overflow-hidden ">
                <Image
                  src={item.image}
                  alt={item.title}
                  height={1000}
                  width={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full space-y-4">
                <h1 className="text-xl line-clamp-2">{item.title}</h1>
                <button
                  onClick={() => handleArticleClick(item.id)}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-center w-full hover:bg-green-600"
                >
                  আরও পড়ুন
                </button>
              </div>
            </div>
          ))}
        </div>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          message="No more data"
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#948a8a",
              color: "#000",
              boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
              borderRadius: "4px",
            },
          }}
        />
      </div>
    </>
  );
};

export default CategoryView;
