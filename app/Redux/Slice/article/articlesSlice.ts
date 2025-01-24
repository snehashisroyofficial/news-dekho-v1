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

// Define the Article interface with all possible fields
interface Article {
  id: string;
  category: string;

  image: string;

  timestamp: any;
  title: string;

}

// Define the state interface, only using the necessary fields for articles
interface ArticlesState {
  articles: { category:string; id: string; image: string; title: string; timestamp: any }[];
  loading: boolean;
  error: string | null;
  lastVisible: any;
  hasMore: boolean;
  fetchedLessThanLimit: boolean;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  lastVisible: null,
  hasMore: true,
  fetchedLessThanLimit: false,
};

// Fetch articles with only selected fields (id, image, title, timestamp)
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (
    {
      limitCount = 10,
      startAfterDoc = null,
      categoryId = null,
    }: { limitCount: number; startAfterDoc: any; categoryId?: string | null },
    { rejectWithValue }
  ) => {
    try {
      let q = query(
        collection(db, "articles"),
        where("status", "==", "Live"),
        orderBy("timestamp", "desc"),
        limit(limitCount)
      );

      if (categoryId) {
        q = query(
          collection(db, "articles"),
          where("categoryId", "==", categoryId),
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

      // Map the documents to extract only required fields
      const articlesList = articlesSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          image: data.image || "",
          title: data.title || "",
          category: data.category || "",
          timestamp: data.timestamp || null,
        };
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

// Create the slice for articles state
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    resetArticles(state) {
      state.articles = [];
      state.lastVisible = null;
      state.hasMore = true;
      state.error = null;
      state.fetchedLessThanLimit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { articlesList, lastVisible } = action.payload;

        state.articles = [...state.articles, ...articlesList];
        state.loading = false;
        state.lastVisible = lastVisible;

        if (articlesList.length < 10) {
          state.hasMore = false;
          state.fetchedLessThanLimit = true;
        } else {
          state.hasMore = true;
          state.fetchedLessThanLimit = false;
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { resetArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
