// src/Redux/Slice/whatsappSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type for the WhatsApp slice
interface WhatsAppState {
  status: 'idle' | 'sending' | 'success' | 'failed';
  error: string | null;
}

const initialState: WhatsAppState = {
  status: 'idle',
  error: null,
};

// Create the slice
const whatsappSlice = createSlice({
  name: 'whatsapp',
  initialState,
  reducers: {
    sendWhatsAppMessageRequest: (state) => {
      state.status = 'sending';
    },
    sendWhatsAppMessageSuccess: (state) => {
      state.status = 'success';
      state.error = null;
    },
    sendWhatsAppMessageFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  sendWhatsAppMessageRequest,
  sendWhatsAppMessageSuccess,
  sendWhatsAppMessageFailure,
} = whatsappSlice.actions;

export default whatsappSlice.reducer;

// Async action to send the WhatsApp message
export const sendWhatsAppMessage = (message: string, phoneNumber: string) => async (dispatch: any) => {
  try {
    dispatch(sendWhatsAppMessageRequest());

    // Use WhatsApp deep link for mobile apps
    const whatsappAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Attempt to open WhatsApp app directly using the URL scheme
    window.location.href = whatsappAppUrl;

    dispatch(sendWhatsAppMessageSuccess());
  } catch (error: any) {
    dispatch(sendWhatsAppMessageFailure(error.message));
  }
};

