import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { Timestamp } from "firebase/firestore"; // Import Firebase's Timestamp type

// Interface for Article with more specific types
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
  timestamp: Timestamp; // Use Timestamp for Firestore's timestamp field
  title: string;
  topic: string;
  topicId: string;
  videoUrl: string;
}

// Define the state structure for the slice
interface BakingArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BakingArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

// Create async thunk to fetch top 3 articles
export const fetchTop3Articles = createAsyncThunk<
  { articlesList: Article[] }, // Correct return type
  void, // No parameters
  { rejectValue: string } // Reject value type (string for error messages)
>("bakingArticles/fetchTop3Articles", async (_, { rejectWithValue }) => {
  try {
    const q = query(
      collection(db, "articles"),
      orderBy("timestamp", "desc"),
      limit(20)
    );

    const articlesSnapshot = await getDocs(q);

    if (articlesSnapshot.empty) {
      return { articlesList: [] };
    }

    const articlesList: Article[] = articlesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Article;
    });

    return { articlesList };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch articles");
  }
});

// Slice to handle state changes based on actions
const bakingArticlesSlice = createSlice({
  name: "bakingArticles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTop3Articles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTop3Articles.fulfilled, (state, action) => {
        state.articles = action.payload.articlesList;
        state.loading = false;
      })
      .addCase(fetchTop3Articles.rejected, (state, action) => {
        state.error = action.payload as string; // Ensuring it's a string
        state.loading = false;
      });
  },
});

export default bakingArticlesSlice.reducer;

// Remove the unused `where` function, as it's not necessary
// If you want to use `where`, you can import it from Firestore and implement it correctly when needed.
