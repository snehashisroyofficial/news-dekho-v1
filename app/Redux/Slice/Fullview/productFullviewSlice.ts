import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig'; 
import { FirebaseError } from 'firebase/app';

export interface Product {
  id: string;
  category_id: string;
  category_name: string;
  description: string;
  image_url: string;
  ingredients: string;
  price: number;
  rating: string;
  status: string;
  store_id: string;
  store_name: string;
  subcategory_id: string;
  subcategory_name: string;
  tag: string;
  timestamp: any; 
  title: string;
  subtitle: string;
  unit: string;
  unit_value: string;
}

interface ProductFullViewState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductFullViewState = {
  product: null,
  loading: false,
  error: null,
};


export const fetchProductById = createAsyncThunk(
  'productFullView/fetchProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const productDoc = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productDoc);

      if (!productSnapshot.exists()) {
        return rejectWithValue('Product not found');
      }

      return {
        id: productSnapshot.id,
        ...productSnapshot.data(),
      } as Product;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch product');
    }
  }
);


export const updateProduct = createAsyncThunk(
  'productFullView/updateProduct',
  async (product: Product, { rejectWithValue }) => {
    try {
      const productDoc = doc(db, 'products', product.id);
      await updateDoc(productDoc, { ...product }); 
      return product; 
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update product');
    }
  }
);


export const deleteProduct = createAsyncThunk(
  'productFullView/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const productDoc = doc(db, 'products', productId);
      await deleteDoc(productDoc); 
      return productId; 
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete product');
    }
  }
);

const productFullViewSlice = createSlice({
  name: 'productFullView',
  initialState,
  reducers: {
    resetProduct(state) {
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = action.payload; 
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload as string; 
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, ) => {
        state.product = null; 
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as string; 
        state.loading = false;
      });
  },
});

export const { resetProduct } = productFullViewSlice.actions;
export default productFullViewSlice.reducer;
