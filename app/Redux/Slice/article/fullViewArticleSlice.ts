import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase/firebaseConfig'; 
import { doc, getDoc, Timestamp } from 'firebase/firestore';


interface FullViewArticle {
  category: string;
  categoryId: string;
  contentType: string;
  description: string;
  id: string;
  image: string;
  status: string;
  tag: string;
  tagId: string;
  tagName: string;
  timestamp: Timestamp;
  title: string;
  topic: string;
  topicId: string;
  videoUrl: string;
  authorBio: string;
  authorID: string;
  authorImage: string;
  authorName: string;
  authorRole: string;
}


interface FullViewArticleState {
  article: FullViewArticle | null;
  loading: boolean;
  error: string | null;
}


const initialState: FullViewArticleState = {
  article: null,
  loading: false,
  error: null,
};


export const fetchFullViewArticle = createAsyncThunk(
  'article/fetchFullViewArticle',
  async (articleId: string) => {
    const docRef = doc(db, 'articles', articleId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const articleData = docSnap.data();
      
      
      return articleData as FullViewArticle; 
    } else {
      throw new Error('Article not found');
    }
  }
);


const fullViewArticleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFullViewArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFullViewArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(fetchFullViewArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch article';
      });
  },
});


export default fullViewArticleSlice.reducer;
