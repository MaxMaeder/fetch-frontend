import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

// Define images slice data
interface ImagesState {
  imagesByBreed: { [breed: string]: string[] };
  loading: boolean;
  error: string | null;
}

// Images slice init data
const initialState: ImagesState = {
  imagesByBreed: {},
  loading: false,
  error: null,
};

// Async action to fetch dog images given a list of dog breeds
export const getImagesByBreeds = createAsyncThunk(
  "images/getImagesByBreeds",
  async (breeds: string[], { rejectWithValue }) => {
    try {
      // Get dog images for each breed
      const breedImages = await Promise.all(
        breeds.map(async (breed) => {
          const imagesResponse = await axios.get(
            `https://dog.ceo/api/breed/${breed}/images`
          );
          return { breed, images: imagesResponse.data.message };
        })
      );

      // Save in state
      return breedImages.reduce((acc, { breed, images }) => {
        acc[breed] = images;
        return acc;
      }, {} as { [breed: string]: string[] });
    } catch (error) {
      return rejectWithValue("Failed to fetch images");
    }
  }
);

// Create a redux slice for images
const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Async getImagesByBreeds action started
      .addCase(getImagesByBreeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Async getImagesByBreeds action done
      .addCase(
        getImagesByBreeds.fulfilled,
        (state, action: PayloadAction<{ [breed: string]: string[] }>) => {
          state.loading = false;
          state.imagesByBreed = action.payload;
        }
      )
      // Async getImagesByBreeds action failed
      .addCase(getImagesByBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Select images corresponding to the specified breed names
export const selectImagesByBreed = createSelector(
  (state: RootState) => state.images.imagesByBreed, // Select images from store
  (_: RootState, breeds: string[]) => breeds,
  (imagesByBreed, breeds) => {
    // Create array of all images
    return breeds.reduce((acc: string[], breed: string) => {
      if (imagesByBreed[breed]) {
        acc.push(...imagesByBreed[breed]);
      }
      return acc;
    }, []);
  }
);

export default imagesSlice.reducer;
