import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CloudinaryState {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CloudinaryState = {
  imageUrl: null,
  loading: false,
  error: null,
};

// Async thunk for uploading image to Cloudinary
export const uploadImage = createAsyncThunk(
  "cloudinary/upload",
  async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset"); // Replace with your Cloudinary upload preset
    formData.append("folder", "images"); // Specify the folder name

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dfxbmuflr/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Return the secure URL of the uploaded image
  }
);

// Create slice
const cloudinarySlice = createSlice({
  name: "cloudinary",
  initialState,
  reducers: {
    resetCloudinaryState: (state) => {
      state.imageUrl = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to upload image";
      });
  },
});

// Export actions and reducer
export const { resetCloudinaryState } = cloudinarySlice.actions;
export default cloudinarySlice.reducer;
