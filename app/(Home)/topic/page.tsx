"use client";

import React, { useEffect, useCallback, useState } from "react";
import {
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import {
  fetchTopicArticles,
  resetTopicArticles,
} from "../../Redux/Slice/article/topicArticlesSlice";
import debounce from "lodash/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import BottomNavbar from "@/app/components/shared/BottomNavbar";
import Image from "next/image";

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

const Topic: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {
    articles,
    loading,
    error,
    lastVisible,
    hasMore,
    fetchedLessThanLimit,
  } = useSelector((state: RootState) => state.topicArticles);

  const [loadingMore, setLoadingMore] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] =
    useState<FullViewArticle | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      dispatch(resetTopicArticles());
      dispatch(
        fetchTopicArticles({ limitCount: 8, startAfterDoc: null, topicId: id })
      );
    }
  }, [dispatch, id]);

  const loadMoreArticles = useCallback(() => {
    if (hasMore && !loading) {
      console.log("Loading more articles...");
      setLoadingMore(true);
      dispatch(
        fetchTopicArticles({ limitCount: 10, startAfterDoc: lastVisible })
      ).finally(() => setLoadingMore(false));
    } else {
      console.log("No more articles to load or already loading");
    }
  }, [dispatch, hasMore, loading, lastVisible]);

  const handleScroll = useCallback(
    debounce(() => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const maxScrollPosition = document.documentElement.offsetHeight - 300;

      if (scrollPosition >= maxScrollPosition) {
        console.log("Scrolling to load more articles");
        loadMoreArticles();
      }
    }, 500),
    [loadMoreArticles]
  );

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

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedArticle(null);
  };

  const handleArticleClick = (id: string) => {
    router.push(`/article/${id}`);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center gap-4 text-center">
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

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <div className="min-h-screen p-2 lg:p-6">
        <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-6">
          {articles.map((item) => (
            <div
              key={item.id}
              className="max-w-96 max-h-96 h-full border-2 border-red-100 rounded-xl p-4 flex flex-col justify-between gap-4"
            >
              <div className="w-full h-64 rounded-xl overflow-hidden">
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

        {loadingMore && <CircularProgress />}

        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogTitle>
            {selectedArticle ? selectedArticle.title : "Loading..."}
          </DialogTitle>
          <DialogContent>
            {selectedArticle ? (
              <>
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  height={1000}
                  width={1000}
                  className="rounded-lg"
                />
                <Typography
                  variant="body1"
                  color="#4C4C4C"
                  fontSize="16px"
                  fontWeight="bold"
                  marginTop={2}
                >
                  {selectedArticle.category}
                </Typography>
                <Typography
                  variant="body1"
                  color="#4C4C4C"
                  fontSize="14px"
                  marginTop={1}
                >
                  {selectedArticle.description}
                </Typography>
                <Typography
                  variant="body1"
                  color="#4C4C4C"
                  fontSize="14px"
                  marginTop={1}
                >
                  <a
                    href={selectedArticle.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </a>
                </Typography>
              </>
            ) : (
              <CircularProgress />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {showSnackbar && (
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="info">
            No more articles to load.
          </Alert>
        </Snackbar>
      )}

      <BottomNavbar />
    </div>
  );
};

export default Topic;
