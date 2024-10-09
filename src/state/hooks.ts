import { Action, ThunkAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
