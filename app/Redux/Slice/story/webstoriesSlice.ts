import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';

// Story interface
interface Story {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  story: StoryItem[]; // Array of stories
}

// Story interface for each individual story item
interface StoryItem {
  id: string;
  imageUrl: string;
  title: string;
}

// Story state
interface StoryState {
  stories: Story[]; // Change to an array to store multiple stories
  loading: boolean;
  error: string | null;
}

const initialState: StoryState = {
  stories: [],
  loading: false,
  error: null,
};

// Helper function for error handling
const handleFirebaseError = (error: any) => {
  if (error instanceof FirebaseError) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Fetch all stories
export const fetchAllStories = createAsyncThunk<Story[], void, { rejectValue: string }>(
  'webstories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const storiesCollection = collection(db, 'story');
      const storySnapshot = await getDocs(storiesCollection);

      if (storySnapshot.empty) {
        return rejectWithValue('No stories found');
      }

      const stories: Story[] = [];
      storySnapshot.forEach(doc => {
        const data = doc.data();
        stories.push({ id: doc.id, ...data } as Story);
      });

      return stories;
    } catch (error) {
      return rejectWithValue(handleFirebaseError(error));
    }
  }
);

// Web stories slice with reducers and async actions
const webstoriesSlice = createSlice({
  name: 'webstories',
  initialState,
  reducers: {
    resetStories: (state) => {
      state.stories = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStories.fulfilled, (state, action: PayloadAction<Story[]>) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchAllStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetStories } = webstoriesSlice.actions;
export default webstoriesSlice.reducer;
