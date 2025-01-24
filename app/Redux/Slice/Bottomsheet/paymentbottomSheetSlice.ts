
import { createSlice } from '@reduxjs/toolkit';

interface BottomSheetState {
    isOpen: boolean;
}

const initialState: BottomSheetState = {
    isOpen: false,
};

const PaymentbottomSheetSlice = createSlice({
    name: 'PaymentbottomSheet',
    initialState,
    reducers: {
        openPaymentBottomSheet(state) {
            state.isOpen = true;
        },
        closePaymentBottomSheet(state) {
            state.isOpen = false;
        },
    },
});

export const { openPaymentBottomSheet, closePaymentBottomSheet } = PaymentbottomSheetSlice.actions;
export default PaymentbottomSheetSlice.reducer;