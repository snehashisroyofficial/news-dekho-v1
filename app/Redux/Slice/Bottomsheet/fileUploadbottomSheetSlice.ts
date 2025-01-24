
import { createSlice } from '@reduxjs/toolkit';

interface BottomSheetState {
    isOpen: boolean;
}

const initialState: BottomSheetState = {
    isOpen: false,
};

const fileuploadSheetSlice = createSlice({
    name: 'fileuploadbottomSheet',
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

export const { openRepeatBottomSheet, closeRepeatBottomSheet } = fileuploadSheetSlice.actions;
export default fileuploadSheetSlice.reducer;