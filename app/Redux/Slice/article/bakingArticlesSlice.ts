import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig'; 
import { FirebaseError } from 'firebase/app';

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

interface BakingArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: BakingArticlesState = {
  articles: [],
  loading: false,
  error: null,
};


export const fetchTop3Articles = createAsyncThunk(
  'bakingArticles/fetchTop3Articles',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, 'articles'),
      
        orderBy('timestamp', 'desc'),
        limit(3)
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
      return rejectWithValue('Failed to fetch articles');
    }
  }
);

const bakingArticlesSlice = createSlice({
  name: 'bakingArticles',
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
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default bakingArticlesSlice.reducer;
function where(arg0: string, arg1: string, arg2: string): import("@firebase/firestore").QueryCompositeFilterConstraint {
    throw new Error('Function not implemented.');
}

