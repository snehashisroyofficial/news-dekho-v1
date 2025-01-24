import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface variableeState {
  mystoreId: string; 
  cloudinaryFile:string;
  selectedCategoryId: string;
  selectedCategoryName: string;
  myPaymentMethod: string;
  myOrderMethod: string;
  myCartUpdate: string;
  mySelectedProductID: string;
  myAddressInfo: addresssInfoState;
}

interface addresssInfoState {
  Lat: number;
  Lng: number;
  Address: string;
  State: string;
  District: string;
  City: string;
  PinCode: number;
  country: string;
}

const initialState: variableeState = {
  mystoreId: '',
  cloudinaryFile: '',
  selectedCategoryId: '',
  selectedCategoryName: '',
  myPaymentMethod: '',
  myOrderMethod: '',
  myCartUpdate: '',
  mySelectedProductID: '',
  myAddressInfo: {
    Lat: 0,
    Lng: 0,
    Address: '',
    State: '',
    District: '',
    City: '',
    PinCode: 0,
    country: ''
  },
};

const variableSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    mystoreId(state, action: PayloadAction<string>) {
      state.mystoreId = action.payload;
    },


    cloudinaryFile(state, action: PayloadAction<string>) {
      state.cloudinaryFile = action.payload;
    },
    selectedCategoryId(state, action: PayloadAction<string>) {
      state.selectedCategoryId = action.payload;
    },
    selectedCategoryName(state, action: PayloadAction<string>) {
      state.selectedCategoryName = action.payload;
    },
    myPaymentMethod(state, action: PayloadAction<string>) {
      state.myPaymentMethod = action.payload;
    },
    myOrderMethod(state, action: PayloadAction<string>) {
      state.myOrderMethod = action.payload;
    },
    myCartUpdate(state, action: PayloadAction<string>) {
      state.myCartUpdate = action.payload;
    },
    mySelectedProductID(state, action: PayloadAction<string>) {
      state.mySelectedProductID = action.payload;
    },
    myAddressInfo(state, action: PayloadAction<addresssInfoState>) {
      state.myAddressInfo = action.payload;
    },
    
    
  },
});

export const { mystoreId, cloudinaryFile, selectedCategoryId, selectedCategoryName, myAddressInfo, myPaymentMethod, myOrderMethod, myCartUpdate, mySelectedProductID } = variableSlice.actions;
export default variableSlice.reducer;
