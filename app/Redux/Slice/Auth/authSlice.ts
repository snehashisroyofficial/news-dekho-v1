import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth, googleProvider } from '../../../firebase/firebaseConfig';
import { db } from '../../../firebase/firebaseConfig'; 
import { doc, setDoc } from 'firebase/firestore';
import Cookies from 'js-cookie'; 


const getErrorMessage = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'The email address is already in use.';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    default:
      return 'An unknown error occurred. Please try again.';
  }
};


interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean; 
}


const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: !!Cookies.get('isAuthenticated'), 
};


export const signupWithEmail = createAsyncThunk(
  'auth/signupWithEmail',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        userId: user.uid,
        id: user.uid, 
        createdAt: new Date(), 
        lastLogin: new Date(), 
      });

      
      Cookies.set('isAuthenticated', 'true', { expires: 7 }); 
      Cookies.set('userId', user.uid, { expires: 7 }); 
      Cookies.set('userName', user.displayName || 'User', { expires: 7 }); 
      Cookies.set('email', user.email || '', { expires: 7 }); 

      return user.email;
    } catch (error) {
      console.error('Error signing up with Email/Password:', error);
      if (error instanceof FirebaseError) {
        return rejectWithValue(getErrorMessage(error));
      }
      return rejectWithValue('Failed to sign up with Email/Password');
    }
  }
);


export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        userId: user.uid, 
        id: user.uid,  
        lastLogin: new Date(),
      });

      
      Cookies.set('isAuthenticated', 'true', { expires: 7 }); 
      Cookies.set('userId', user.uid, { expires: 7 }); 
      Cookies.set('userName', user.displayName || 'User', { expires: 7 }); 
      Cookies.set('email', user.email || '', { expires: 7 }); 

      return user.email;
    } catch (error) {
      console.error('Error logging in with Email/Password:', error);
      if (error instanceof FirebaseError) {
        return rejectWithValue(getErrorMessage(error));
      }
      return rejectWithValue('Failed to login with Email/Password');
    }
  }
);


export const checkUserSession = createAsyncThunk(
  'auth/checkUserSession',
  async () => {
    
    return Cookies.get('isAuthenticated') ? true : false; 
  }
);


export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      userId: user.uid, 
      id: user.uid,  
      lastLogin: new Date(),
    });

    
    Cookies.set('isAuthenticated', 'true', { expires: 7 }); 
    Cookies.set('userId', user.uid, { expires: 7 }); 
    Cookies.set('userName', user.displayName || 'User', { expires: 7 }); 
    Cookies.set('email', user.email || '', { expires: 7 }); 

    return user.email;
  } catch (error) {
    console.error('Error logging in with Google:', error);
    if (error instanceof FirebaseError) {
      return rejectWithValue(getErrorMessage(error));
    }
    return rejectWithValue('Failed to login with Google');
  }
});


export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    
    Cookies.remove('isAuthenticated');
    Cookies.remove('userId'); 
    Cookies.remove('userName'); 
    Cookies.remove('email'); 
  } catch (error) {
    console.error('Error logging out:', error);
    return rejectWithValue('Failed to logout');
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true; 
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true; 
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false; 
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      
      .addCase(signupWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true; 
      })
      .addCase(signupWithEmail.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});


export const {} = authSlice.actions;
export default authSlice.reducer;
