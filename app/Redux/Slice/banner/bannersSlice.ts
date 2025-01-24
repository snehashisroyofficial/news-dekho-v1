import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig'; 
import { FirebaseError } from 'firebase/app';

interface Banner {
  id: string;
  image: string;
  router_to: string;
  status: string;
  store_id: string;
  subtitle: string;
  tag: string;
  timestamp: any; 
  title: string;
}

interface BannersState {
  banners: Banner[];
  loading: boolean;
  error: string | null;
}

const initialState: BannersState = {
  banners: [],
  loading: false,
  error: null,
};


export const fetchBanners = createAsyncThunk('banners/fetchBanners', async (_, { rejectWithValue }) => {
  try {
    
    const bannersRef = collection(db, 'banners');
    const bannersSnapshot = await getDocs(bannersRef);

    
    console.log("Snapshot size:", bannersSnapshot.size);

    if (bannersSnapshot.empty) {
      console.warn("No documents found in Firestore");
      return [];
    }

    
    const bannersList: Banner[] = bannersSnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("Document data:", data); 
      return {
        id: doc.id,
        ...data,
      };
    }) as Banner[];

    return bannersList;
  } catch (error) {
    console.error("Error fetching banners:", error); 

    if (error instanceof FirebaseError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to fetch banners');
  }
});

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default bannersSlice.reducer;
