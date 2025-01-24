import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";

interface Article {
  id: string;
  category: string;
  categoryId: string;
  contentType: string;
  description: string;
  image: string;
  status: string;
  tag: string;
  tagId: string;
  tagName: string;
  timestamp: any;
  title: string;
  topic: string;
  topicId: string;
  videoUrl: string;
}

interface TrendingArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  lastVisible: any;
  hasMore: boolean;
  fetchedLessThanLimit: boolean;
}

const initialState: TrendingArticleState = {
  articles: [],
  loading: false,
  error: null,
  lastVisible: null,
  hasMore: true,
  fetchedLessThanLimit: false,
};

export const fetchTopTrendingPosts = createAsyncThunk(
  "topTrendingArticles/fetchTopTrendingPosts",
  async (
    {
      limitCount = 2,
      startAfterDoc = null,
      topicId = null,
    }: { limitCount: number; startAfterDoc: any; topicId?: string | null },
    { rejectWithValue }
  ) => {
    try {
      let q = query(
        collection(db, "articles"),
        where("status", "==", "Live"),
        orderBy("timestamp", "desc"),
        limit(limitCount)
      );

      if (topicId) {
        q = query(
          collection(db, "articles"),
          where("topicId", "==", topicId),
          where("status", "==", "Live"),
          orderBy("timestamp", "desc"),
          limit(limitCount)
        );
      }

      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }

      const articlesSnapshot = await getDocs(q);

      if (articlesSnapshot.empty) {
        return { articlesList: [], lastVisible: null };
      }

      const lastVisible =
        articlesSnapshot.docs[articlesSnapshot.docs.length - 1];

      const articlesList: Article[] = articlesSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        } as Article;
      });

      return { articlesList, lastVisible };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch articles");
    }
  }
);

const topTrendingArticleSlice = createSlice({
  name: "topTrendingArticle",
  initialState,
  reducers: {
    topTrendingPost(state) {
      state.articles = [];
      state.lastVisible = null;
      state.hasMore = true;
      state.error = null;
      state.fetchedLessThanLimit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopTrendingPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopTrendingPosts.fulfilled, (state, action) => {
        const { articlesList, lastVisible } = action.payload;

        state.articles = [...state.articles, ...articlesList];
        state.loading = false;
        state.lastVisible = lastVisible;

        if (articlesList.length < 3) {
          state.hasMore = false;
          state.fetchedLessThanLimit = true;
        } else {
          state.hasMore = true;
          state.fetchedLessThanLimit = false;
        }
      })
      .addCase(fetchTopTrendingPosts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { topTrendingPost } = topTrendingArticleSlice.actions;
export default topTrendingArticleSlice.reducer;
