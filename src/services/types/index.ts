import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import store from "../store";
import { TAppActions } from "./actions";
import { useDispatch } from "react-redux";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

export type TApplicationActions = TAppActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()