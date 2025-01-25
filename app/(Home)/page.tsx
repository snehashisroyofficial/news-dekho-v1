import CategoryCircleCards from "../components/HomePage/CategoryCircleCards";
import HomePageBanner from "../components/HomePage/HomePageBanner";
import MarqueeArticles from "../components/HomePage/MarqueeArticles";

const Home = () => {
  return (
    <div>
      <MarqueeArticles />
      <CategoryCircleCards />
      <HomePageBanner />
      <h1>hello world</h1>
    </div>
  );
};

export default Home;
