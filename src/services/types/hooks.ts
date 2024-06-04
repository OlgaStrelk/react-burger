import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { AppThunk, RootState } from ".";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useAppDispatch: () => AppThunk = dispatchHook;