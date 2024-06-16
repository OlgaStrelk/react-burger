import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { RootState } from ".";
import store from "../store";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = dispatchHook.withTypes<AppDispatch>();
