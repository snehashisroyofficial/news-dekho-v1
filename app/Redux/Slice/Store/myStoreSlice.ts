import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';

interface Store {
  id: string;
  address: string;
  category: string;
  contact_ph: string;
  email: string;
  pincode: string;
  play_store_link: string;
  status: string;
  store_banner: string;
  store_image: string;
  store_logo: string;
  store_name: string;
  store_rating: number;
  store_subtitle: string;
  subA_category: string;
  timestamp: string;
  web_link: string;
}

interface BannerFullViewState {
  mystore: Store | null;
  loading: boolean;
  error: string | null;
}

const initialState: BannerFullViewState = {
  mystore: null,
  loading: false,
  error: null,
};


export const fetchStoreById = createAsyncThunk<Store, string, { rejectValue: string }>(
  'myStore/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const storeDoc = doc(db, 'store', id);
      const storeSnapshot = await getDoc(storeDoc);

      if (!storeSnapshot.exists()) {
        return rejectWithValue('Store not found');
      }

      const data = storeSnapshot.data() as Omit<Store, 'id'>;
      return { id: storeSnapshot.id, ...data } as Store;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch store');
    }
  }
);


export const updateStore = createAsyncThunk<void, { id: string; data: Partial<Store> }, { rejectValue: string }>(
  'myStore/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const storeDoc = doc(db, 'store', id);
      await updateDoc(storeDoc, data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update store');
    }
  }
);


const myStoreSlice = createSlice({
  name: 'myStore',
  initialState,
  reducers: {
    resetStore: (state) => {
      state.mystore = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreById.fulfilled, (state, action: PayloadAction<Store>) => {
        state.loading = false;
        state.mystore = action.payload;
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStore.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const { resetStore } = myStoreSlice.actions;
export default myStoreSlice.reducer;
