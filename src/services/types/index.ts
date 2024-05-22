import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import store from "../store";
import { TAppActions } from "./actions";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

export type TApplicationActions = TAppActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;

// export type AppDispatch = ThunkDispatch<
//   RootState,
//   unknown,
//   TApplicationActions
// >;

// export type AppThunkAction<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   TApplicationActions
// >;
