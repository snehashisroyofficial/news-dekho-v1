import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig'; 
import { FirebaseError } from 'firebase/app';


interface Category {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  status: string;
  store_id: string;
  timestamp: any; 
}


interface CategoryFullViewState {
  category: Category | null;
  loading: boolean;
  error: string | null;
}


const initialState: CategoryFullViewState = {
  category: null,
  loading: false,
  error: null,
};


export const fetchCategoryById = createAsyncThunk<
  Category, 
  string, 
  { rejectValue: string } 
>(
  'categoryFullView/fetchCategoryById',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const categoryDoc = doc(db, 'categories', categoryId);
      const categorySnapshot = await getDoc(categoryDoc);

      if (!categorySnapshot.exists()) {
        return rejectWithValue('Category not found');
      }

      const data = categorySnapshot.data() as Omit<Category, 'id'>; 
      return {
        id: categorySnapshot.id,
        ...data,
      } as Category;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch category');
    }
  }
);


export const updateCategory = createAsyncThunk<
  void, 
  { id: string; data: Partial<Category> }, 
  { rejectValue: string } 
>(
  'categoryFullView/updateCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const categoryDoc = doc(db, 'categories', id);
      await updateDoc(categoryDoc, data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update category');
    }
  }
);


export const deleteCategory = createAsyncThunk<
  void, 
  string, 
  { rejectValue: string } 
>(
  'categoryFullView/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const categoryDoc = doc(db, 'categories', categoryId);
      await deleteDoc(categoryDoc);
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete category');
    }
  }
);

const categoryFullViewSlice = createSlice({
  name: 'categoryFullView',
  initialState,
  reducers: {
    resetCategory(state) {
      state.category = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
        
        state.category = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});


export const { resetCategory } = categoryFullViewSlice.actions;


export default categoryFullViewSlice.reducer;
