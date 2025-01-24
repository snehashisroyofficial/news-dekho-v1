
import { createSlice } from '@reduxjs/toolkit';

interface BottomSheetState {
    isOpen: boolean;
}

const initialState: BottomSheetState = {
    isOpen: false,
};

const addressbottomSheetSlice = createSlice({
    name: 'addressbottomSheet',
    initialState,
    reducers: {
        openAddressBottomSheet(state) {
            state.isOpen = true;
        },
        closeAddressBottomSheet(state) {
            state.isOpen = false;
        },
    },
});

export const { openAddressBottomSheet, closeAddressBottomSheet } = addressbottomSheetSlice.actions;
export default addressbottomSheetSlice.reducer;