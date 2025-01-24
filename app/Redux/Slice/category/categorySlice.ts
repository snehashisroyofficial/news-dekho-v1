import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";

interface Category {
  id: string;
  imageUrl: string;
  status: string;
  store_id: string;
  subtitle: string;
  timestamp: Timestamp; // Use proper Firestore Timestamp type
  title: string;
  position:number;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categoriesRef = query(
        collection(db, "categories"),
        orderBy("position")
      ); // Order by "position"

      const categoriesSnapshot = await getDocs(categoriesRef); // Fetch data from Firestore

      if (categoriesSnapshot.empty) {
        console.warn("No categories found in Firestore");
        return [];
      }

      const categoriesList: Category[] = categoriesSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        } as Category;
      });

      return categoriesList;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategories(state) {
      state.categories = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { resetCategories } = categoriesSlice.actions; // Export actions
export default categoriesSlice.reducer;
