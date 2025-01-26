import React, { useEffect } from "react";
import {
  fetchTopRecentPosts,
  resetTopRecentPosts,
} from "../../Redux/Slice/banner/highlightTopSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

const ArticleSuggestion: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const { articles, loading, error } = useSelector(
    (state: RootState) => state.toprecentPostArticlesReducer
  );

  useEffect(() => {
    dispatch(fetchTopRecentPosts({ limitCount: 8, startAfterDoc: null }));

    return () => {
      dispatch(resetTopRecentPosts());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  const handleArticleClick = (articleId: string) => {
    router.push(`/article?id=${articleId}`);
  };

  return (
    <div>
      <div className="flex flex-col   py-8">
        <h1 className="text-lg text-nowrap bg-red-800 p-2 font-semibold text-white w-fit">
          সম্পর্কিত খবর
        </h1>
        <span className="h-1 w-full bg-red-800"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((item, idx) => (
          <div
            onClick={() => handleArticleClick(item.id)}
            key={idx}
            className="flex flex-col md:flex-row items-center gap-4   shadow-md border bg-white cursor-pointer group"
          >
            <div className="h-40 overflow-hidden w-full md:w-1/3">
              <Image
                src={item.image}
                alt={item.title}
                height={1000}
                width={1000}
                className="w-full h-full object-cover group-hover:scale-125 ease-in-out transition duration-300"
              />
            </div>
            <div className="flex flex-col justify-start flex-1 p-4">
              {/* <p className={`p-1 rounded-xl text-sm   w-fit`}>
              {item.topic}
            </p> */}
              <h1 className="text-xl font-semibold ">{item.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleSuggestion;
