import { Box, CircularProgress } from "@mui/material";
import CategoryCircleCards from "../components/HomePage/CategoryCircleCards";
import HomePageBanner from "../components/HomePage/HomePageBanner";
import MarqueeArticles from "../components/HomePage/MarqueeArticles";
import TopTopics from "../components/HomePage/TopTopics";
// import StoryViewer from "../components/HomePage/StoryViewer";
import TrendingArticles from "../components/HomePage/TrendingArticles";

const Home = () => {
  return (
    <div>
      <MarqueeArticles />
      <CategoryCircleCards />
      <HomePageBanner />
      <span className="bg-[url('https://www.transparenttextures.com/patterns/reticular-tissue.png')] w-full h-4 bg-yellow-200/50 flex-1 flex justify-between"></span>
      <TopTopics topicTitle1={"আন্তর্জাতিক"} topicTitle2={"ভারত"} />
      <Box>
        <div className="gap-6 p-4 lg:px-4">
          <h1 className="inline-block text-3xl font-semibold after:content-[''] after:w-full after:h-1 after:bg-black after:block after:mt-2">
            ভিস্যুয়াল স্টোরি
          </h1>
        </div>
        {/* <StoryViewer /> */}
      </Box>
      <TopTopics topicTitle1={"পশ্চিমবঙ্গ"} topicTitle2={"বিনোদন"} />
      <TrendingArticles />
      <TopTopics topicTitle1={"ধর্মকথা"} topicTitle2={"লাইফস্টাইল"} />
    </div>
  );
};

export default Home;
