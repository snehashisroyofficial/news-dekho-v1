import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig'; 
import { FirebaseError } from 'firebase/app';


interface Category {
  id: string;
  imageUrl: string;
  status: string;
  store_id: string;
  subtitle: string;
  timestamp: Timestamp;
  title: string;
}


interface CategoryState {
  loading: boolean;
  error: string | null;
  success: boolean;
}


const initialState: CategoryState = {
  loading: false,
  error: null,
  success: false,
};


export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (category: Category, { rejectWithValue }) => {
    try {
      
      const categoryDocRef = doc(db, 'categories', category.id);
      
      
      await setDoc(categoryDocRef, {
        id: category.id,
        imageUrl: category.imageUrl,
        status: category.status,
        store_id: category.store_id,
        subtitle: category.subtitle,
        timestamp: category.timestamp,
        title: category.title,
      });
      
      return category; 
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create category');
    }
  }
);


const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetSuccessState: (state) => {
      state.success = false; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false; 
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true; 
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.success = false; 
      });
  },
});


export const { resetSuccessState } = categorySlice.actions;

export default categorySlice.reducer;
