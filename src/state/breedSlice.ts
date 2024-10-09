import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

// Define breed slice data
interface BreedState {
  breeds: { name: string; imageUrl: string }[];
  loading: boolean;
  error: string | null;
}

// Breed slice init data
const initialState: BreedState = {
  breeds: [],
  loading: false,
  error: null,
};

// Async action to fetch dog breeds and a random image to represent the breed
export const getBreeds = createAsyncThunk(
  "breeds/getBreeds",
  async (_, { rejectWithValue }) => {
    try {
      // Get breed list
      const breedsResponse = await axios.get(
        "https://dog.ceo/api/breeds/list/all"
      );
      const breedNames = Object.keys(breedsResponse.data.message);

      // Get one random image for each breed
      const breedImages = await Promise.all(
        breedNames.map(async (breed) => {
          const imageResponse = await axios.get(
            `https://dog.ceo/api/breed/${breed}/images/random`
          );
          return { name: breed, imageUrl: imageResponse.data.message };
        })
      );

      return breedImages;
    } catch (error) {
      return rejectWithValue("Failed to fetch breeds");
    }
  }
);

// Create a redux slice for breeds
const breedSlice = createSlice({
  name: "breeds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Async getBreeds action started
      .addCase(getBreeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Async getBreeds action done
      .addCase(
        getBreeds.fulfilled,
        (
          state,
          action: PayloadAction<{ name: string; imageUrl: string }[]>
        ) => {
          state.loading = false;
          state.breeds = action.payload;
        }
      )
      // Async getBreeds action failed
      .addCase(getBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Select all breed data
export const selectBreeds = (state: RootState) => state.breeds;

export default breedSlice.reducer;
