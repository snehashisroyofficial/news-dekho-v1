import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import {
  fetchRecentPosts,
  resetRecentPosts,
} from "../../Redux/Slice/article/recentPostArticlesSlice";
import icon from "../../assets/icon.jpeg";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useRouter } from "next/navigation";
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

const RecentPostComponent: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {
    articles,
    loading,
    error,
    lastVisible,
    hasMore,
    fetchedLessThanLimit,
  } = useSelector((state: RootState) => state.recentPostArticles);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] =
    useState<FullViewArticle | null>(null);

  // Fetch articles on component mount
  useEffect(() => {
    dispatch(resetRecentPosts());
    dispatch(fetchRecentPosts({ limitCount: 10, startAfterDoc: null }));
  }, [dispatch]);

  // Load more articles when "Load More" button is clicked
  const loadMoreArticles = () => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      dispatch(
        fetchRecentPosts({ limitCount: 10, startAfterDoc: lastVisible })
      ).finally(() => {
        setLoadingMore(false);
      });
    }
  };

  // Show snackbar when articles fetched are less than the limit
  useEffect(() => {
    if (fetchedLessThanLimit) {
      setShowSnackbar(true);
    }
  }, [fetchedLessThanLimit]);

  const handleCloseSnackbar = () => setShowSnackbar(false);
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedArticle(null);
  };

  const handleArticleClick = (id: string) => {
    router.push(`/article/${id}`);
  };

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="font-noto-serif-bengali space-y-6">
      {articles.map((article) => (
        <div
          onClick={() => handleArticleClick(article.id)}
          key={article.id}
          className="flex flex-col md:flex-row items-center gap-4   bg-gray-100 border-2 border-gray-300 hover:border-red-300 hover:bg-red-100 rounded-lg  overflow-hidden cursor-pointer group  h-24  "
        >
          {/* left side  */}
          <div className="flex flex-col justify-center  flex-1 p-4 h-full ">
            <h1 className=" text-sm md:text-lg font-semibold  text-ellipsis ">
              {article.title}
            </h1>
          </div>

          {/* right side  */}
          <div className="hidden md:flex h-full overflow-hidden w-full md:w-1/3 ">
            <Image
              src={article.image}
              alt={article.title}
              height={1000}
              width={1000}
              className="w-full h-full object-cover group-hover:scale-125 ease-in-out transition duration-300"
            />
          </div>
        </div>
      ))}

      {loadingMore && <></>}

      <Box display="flex" justifyContent="center" marginTop={2}>
        {hasMore && !loadingMore && (
          <div
            onClick={loadMoreArticles}
            className="bg-red-800 text-white font-semibold px-6 py-2 rounded-full cursor-pointer "
          >
            <h1 className="text-xl">আরও দেখুন...</h1>
          </div>
        )}
      </Box>

      <Box sx={{ height: "50px" }}></Box>

      {fetchedLessThanLimit && (
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
      )}

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedArticle?.title}</DialogTitle>
        <DialogContent>
          <Image
            src={selectedArticle?.image}
            alt={selectedArticle?.title}
            height={1000}
            width={1000}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <Typography
            variant="body1"
            color="#4C4C4C"
            fontSize="16px"
            fontWeight="bold"
            marginTop={2}
          >
            {selectedArticle?.category}
          </Typography>
          <Typography
            variant="body1"
            color="#4C4C4C"
            fontSize="14px"
            marginTop={1}
          >
            {selectedArticle?.description}
          </Typography>
          <Typography
            variant="body1"
            color="#4C4C4C"
            fontSize="14px"
            marginTop={1}
          >
            <a
              href={selectedArticle?.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Video
            </a>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecentPostComponent;
