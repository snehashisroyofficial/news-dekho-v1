import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

interface Topic {
  id: string;
  image: string;
  router_to: string;
  status: string;
  timestamp: string;
  topic: string;
  highlight: boolean; 
}

interface TopicsState {
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

const initialState: TopicsState = {
  topics: [],
  loading: false,
  error: null,
};


export const fetchTopics = createAsyncThunk('topics/fetchTopics', async () => {
  
  const topicsQuery = query(
    collection(db, 'topics'),
    where('highlight', '==', true)
  );
  
  const querySnapshot = await getDocs(topicsQuery);
  const topics = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Topic[];
  return topics;
});

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch topics';
      });
  },
});

export default topicsSlice.reducer;
