import { UnknownAction } from "redux";
import { ThunkAction } from "redux-thunk";
import store from "../store";
import { TAppActions } from "./actions";

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

