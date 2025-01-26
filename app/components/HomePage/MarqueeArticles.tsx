import { fetchTop3Articles } from "@/app/Redux/Slice/article/bakingArticlesSlice";
import { RootState } from "@/app/Redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WhatshotIcon from "@mui/icons-material/Whatshot";
const MarqueeArticles: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const { articles, loading, error } = useSelector(
    (state: RootState) => state.bakingArticles
  );

  useEffect(() => {
    dispatch(fetchTop3Articles());
  }, [dispatch]);

  const handleArticleClick = (articleId: string) => {
    router.push(`/article?id=${articleId}`);
  };

  return (
    <div className=" relative overflow-hidden p-2  bg-[url('https://www.transparenttextures.com/patterns/reticular-tissue.png')]  bg-yellow-100">
      <div className="z-10 absolute top-0 bottom-0 left-0 flex justify-center items-center gap-3 bg-[#FCC510FF] px-8 lg:px-28 h-full">
        <WhatshotIcon />
        <h1 className="font-bold ">Trending</h1>
      </div>

      <div className=" flex animate-infinite-scroll whitespace-nowrap ">
        {articles.map((item, idx) => (
          <h1
            onClick={() => handleArticleClick(item.id)}
            key={idx}
            className="text-lg px-10 font-semibold hover:text-blue-700 cursor-pointer"
          >
            {item.title}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default MarqueeArticles;
