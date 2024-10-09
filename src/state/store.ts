import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import breedReducer from "./breedSlice";
import imagesReducer from "./imagesSlice";

const rootReducer = combineReducers({
  breeds: breedReducer,
  images: imagesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
