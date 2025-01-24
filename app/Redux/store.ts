import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import bannersReducer from "../Redux/Slice/banner/bannersSlice";
import categoryReducer from "../Redux/Slice/category/categorySlice";
import authReducer from "../Redux/Slice/Auth/authSlice";
import userReducer from "../Redux/Slice/User/userSlice";

import articleReducer from "./Slice/article/articlesSlice";
import fullViewArticleReducer from "./Slice/article/fullViewArticleSlice";
import topicArticlesReducer from "./Slice/article/topicArticlesSlice";
import tagArticlesReducer from "./Slice/article/tagArticlesSlice";
import recentPostArticlesReducer from "./Slice/article/recentPostArticlesSlice";
import videoArticlesReducer from "./Slice/article/videoArticleSlice";
import bakingArticlesReducer from "./Slice/article/bakingArticlesSlice";
import storyReducer from './Slice/story/storySlice';    
import webstoriesReducer from './Slice/story/webstoriesSlice';    

import nestedtopicsReducer from "./Slice/nested/topicsSlice";
import nestedarticlesReducer from "./Slice/nested/articlesSlice";
import toprecentPostArticlesReducer from "./Slice/banner/highlightTopSlice";
import topTrendingPostArticleReducer from "./Slice/article/trendingArticles";

import orderchoosebottomSheetReducer from "./Slice/Bottomsheet/orderChoosebottomSheetSlice";
import fileuploadbottomSheetReducer from "./Slice/Bottomsheet/fileUploadbottomSheetSlice";

import addresssbottomSheetReducer from "./Slice/Bottomsheet/addressbottomSheetSlice";

import whatsappReducer from "./Slice/Whatsapp/whatsappSlice";

import productFullViewReducer from "./Slice/Fullview/productFullviewSlice";
import categoryFullViewReducer from "./Slice/Fullview/categoryFullviewSlice";
import bannerFullViewReducer from "./Slice/Fullview/bannerFullViewSlice";
import createCategoryReducer from "./Slice/category/addCategorySlice";

import globalVariablesReducer from "./Slice/Variables/globalVariablesSlice";
import cloudinaryReducer from "./Slice/Component/cloudinarySlice";
import myStoreReducer from "./Slice/Store/myStoreSlice";

import topVideoArticlesReducer from "./Slice/article/topVideoArticlesSlice";
import topCategoryReducer from "./Slice/category/topCategorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    addressbottomSheet: addresssbottomSheetReducer,
    myStore: myStoreReducer,
    webstories: webstoriesReducer,
    
    orderchoosebottomSheet: orderchoosebottomSheetReducer,
    fileuploadbottomSheet: fileuploadbottomSheetReducer,
    globalVariables: globalVariablesReducer,
    whatsapp: whatsappReducer,
    myStory: storyReducer,  
    cloudinary: cloudinaryReducer,

    bakingArticles: bakingArticlesReducer,
    banners: bannersReducer,

    articles: articleReducer,
    article: fullViewArticleReducer,
    topicArticles: topicArticlesReducer,
    tagArticles: tagArticlesReducer,
    recentPostArticles: recentPostArticlesReducer,
    videoArticles: videoArticlesReducer,

    topCategory: topCategoryReducer,
    categories: categoryReducer,
    productFullView: productFullViewReducer,
    categoryFullView: categoryFullViewReducer,
    bannerFullView: bannerFullViewReducer,
    createCategory: createCategoryReducer,

    nestedtopics: nestedtopicsReducer,
    nestedarticles: nestedarticlesReducer,
    toprecentPostArticlesReducer: toprecentPostArticlesReducer,
    topVideoArticles: topVideoArticlesReducer,
    topTrendingPostArticleReducer: topTrendingPostArticleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
