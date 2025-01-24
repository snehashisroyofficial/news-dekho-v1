import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Async thunk to fetch the 'story' collection data
export const fetchStoryData = createAsyncThunk(
  'story/fetchStoryData',
  async (docId: string, { rejectWithValue }) => {
    try {
      const db = getFirestore();
      const storyDoc = await getDoc(doc(db, 'story', docId));
      if (storyDoc.exists()) {
        return storyDoc.data();
      } else {
        return rejectWithValue('Document does not exist.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

interface StoryItem {
  id: string;
  imageUrl: string;
  title: string;
  timestamp?: string; // Optional, depending on its existence
}

interface StoryState {
  status: string | null;
  story: StoryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: StoryState = {
  status: null,
  story: [],
  loading: false,
  error: null,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status || null;
        state.story = action.payload.story || [];
      })
      .addCase(fetchStoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default storySlice.reducer;
