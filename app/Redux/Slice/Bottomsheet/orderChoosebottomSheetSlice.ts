
import { createSlice } from '@reduxjs/toolkit';

interface BottomSheetState {
    isOpen: boolean;
}

const initialState: BottomSheetState = {
    isOpen: false,
};

const repeatbottomSheetSlice = createSlice({
    name: 'orderchoosebottomSheet',
    initialState,
    reducers: {
        openRepeatBottomSheet(state) {
            state.isOpen = true;
        },
        closeRepeatBottomSheet(state) {
            state.isOpen = false;
        },
    },
});

export const { openRepeatBottomSheet, closeRepeatBottomSheet } = repeatbottomSheetSlice.actions;
export default repeatbottomSheetSlice.reducer;