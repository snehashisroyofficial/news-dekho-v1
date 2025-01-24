import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';

interface Banner {
  id: string;
  title: string;
  image: string;
  router_to: string;
  status: string;
  subtitle: string;
  store_id: string;
  tag: string;
  timestamp: any;
}


interface BannerFullViewState {
  banner: Banner | null;
  loading: boolean;
  error: string | null;
}

const initialState: BannerFullViewState = {
  banner: null,
  loading: false,
  error: null,
};

export const fetchBannerById = createAsyncThunk<
  Banner,
  string,
  { rejectValue: string }
>(
  'bannerFullView/fetchBannerById',
  async (bannerId, { rejectWithValue }) => {
    try {
      const bannerDoc = doc(db, 'banners', bannerId);
      const bannerSnapshot = await getDoc(bannerDoc);

      if (!bannerSnapshot.exists()) {
        return rejectWithValue('Banner not found');
      }

      const data = bannerSnapshot.data() as Omit<Banner, 'id'>;
      return { id: bannerSnapshot.id, ...data } as Banner;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch banner');
    }
  }
);

export const updateBanner = createAsyncThunk<
  void,
  { id: string; data: Partial<Banner> },
  { rejectValue: string }
>(
  'bannerFullView/updateBanner',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const bannerDoc = doc(db, 'banners', id);
      await updateDoc(bannerDoc, data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update banner');
    }
  }
);

export const deleteBanner = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  'bannerFullView/deleteBanner',
  async (bannerId, { rejectWithValue }) => {
    try {
      const bannerDoc = doc(db, 'banners', bannerId);
      await deleteDoc(bannerDoc);
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete banner');
    }
  }
);

const bannerFullViewSlice = createSlice({
  name: 'bannerFullView',
  initialState,
  reducers: {
    resetBanner(state) {
      state.banner = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBannerById.fulfilled, (state, action) => {
        state.banner = action.payload;
        state.loading = false;
      })
      .addCase(fetchBannerById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state) => {
        state.banner = null;
        state.loading = false;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { resetBanner } = bannerFullViewSlice.actions;
export default bannerFullViewSlice.reducer;
