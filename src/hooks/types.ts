import type {} from "redux-thunk/extend-redux";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import type { AppActions, RootState } from "../services/store";
import { ThunkAction } from "redux-thunk";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;
export type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
