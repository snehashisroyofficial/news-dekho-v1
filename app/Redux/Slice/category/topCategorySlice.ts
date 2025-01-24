import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

interface TopCategory {
  id: string;
  topic: string;
}

interface TopCategoryState {
  topCategories: TopCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: TopCategoryState = {
  topCategories: [],
  loading: false,
  error: null,
};

export const fetchTopCategories = createAsyncThunk(
  'topCategory/fetchTopCategories',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "topics"), orderBy("position"))
      ); // Order by "position"

      const topCategories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TopCategory[];

      return topCategories;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const topCategorySlice = createSlice({
  name: 'topCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopCategories.fulfilled, (state, action: PayloadAction<TopCategory[]>) => {
        state.loading = false;
        state.topCategories = action.payload;
      })
      .addCase(fetchTopCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default topCategorySlice.reducer;
