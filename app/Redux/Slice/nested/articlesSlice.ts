import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

interface Article {
  id: string;
  category: string;
  contentType: string;
  description: string;
  image: string;
  status: string;
  tag: string;
  title: string;
  topicId: string;
}

interface ArticlesState {
  byTopicId: { [key: string]: Article[] };
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  byTopicId: {},
  loading: false,
  error: null,
};

export const fetchArticlesByTopic = createAsyncThunk(
  "articles/fetchArticlesByTopic",
  async (topicId: string) => {
    const q = query(
      collection(db, "articles"),
      where("topicId", "==", topicId),
      limit(3)
    );
    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Article[];
    return { topicId, articles };
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesByTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticlesByTopic.fulfilled, (state, action) => {
        state.loading = false;
        const { topicId, articles } = action.payload;

        state.byTopicId[topicId] = articles;
      })
      .addCase(fetchArticlesByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch articles";
      });
  },
});

export default articlesSlice.reducer;
