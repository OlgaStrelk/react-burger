import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";

import { rootReducer } from "./reducers/index.ts";

const composeEnhancers =
  //@ts-ignore
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppActions =
  | TBurgerConstructorActions
  | TIngredientsActions
  | TLoginActions
  | TLogoutActions
  | TModalActions
  | TOrderActions
  | TEditProfileActions
  | TRegisterActions
  | TResetFormActions
  | TResetFormTwoActions
  | TUserActions;




