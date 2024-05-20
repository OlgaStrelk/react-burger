import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";

import { rootReducer } from "./reducers/index.ts";
import { TBurgerConstructorActions } from "./reducers/burger-constructor.ts";
import { TIngredientsActions } from "./reducers/ingredients.ts";
import { TLoginActions } from "./reducers/login.ts";
import { TLogoutActions } from "./reducers/logout.ts";
import { TModalActions } from "./reducers/modal.ts";
import { TOrderActions } from "./reducers/order.ts";
import { TEditProfileActions } from "./reducers/profile-form.ts";
import { TRegisterActions } from "./reducers/register.ts";
import { TResetFormActions } from "./reducers/reset-form.ts";
import { TResetFormTwoActions } from "./reducers/reset-form-two.ts";
import { TUserActions } from "./reducers/user.ts";

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




