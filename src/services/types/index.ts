import { Action, ActionCreator, UnknownAction } from "redux";
import { ThunkAction } from "redux-thunk";
import store from "../store";
import { TAppActions } from "./actions";
import { useDispatch } from "react-redux";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

export type TApplicationActions = TAppActions;

export type GetStateType=()=>RootState
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()