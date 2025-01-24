import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig'; 



interface UserState {
  userId: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  image_url: string;
  lastLogin: string | Date;
  status: string;
  alt_number: string;
  fcm_token: string;
  device_id: string;
  password: string;
}


const initialState: UserState = {
  userId: '',
  name: '',
  email: '',
  phone: '',
  bio: '',
  image_url: '',
  lastLogin: '',
  status: '',
  alt_number: '',
  fcm_token: '',
  device_id: '',
  password: '',
};


export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<UserState>, { rejectWithValue }) => {
    const { userId, ...rest } = userData; 
    
    
    if (!userId) {
      return rejectWithValue('User ID is required');
    }

    try {
      const userRef = doc(db, 'users', userId); 
      await updateDoc(userRef, {
        ...rest, 
        lastLogin: new Date(), 
      });
      return userData; 
    } catch (error) {
      return rejectWithValue('Failed to update user data.');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      
      return { ...state, ...action.payload };
    });
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
