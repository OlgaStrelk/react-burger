import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";

import { rootReducer } from "./reducers/index.ts";
import { TBurgerConstructorActions } from "./actions/constructor-ingredients.ts";
import { TIngredientsActions } from "./actions/ingredients.ts";
import { TLoginActions } from "./actions/login.ts";
import { TModalActions } from "./actions/modal.ts";
import { TOrderActions } from "./actions/order.ts";
import { TEditProfileActions } from "./actions/profile-form.ts";
import { TRegisterActions } from "./actions/register.ts";
import { TResetFormTwoActions } from "./actions/reset-form-two.ts";
import { TUserActions } from "./actions/user.ts";
import { TResetFormActions } from "./actions/reset-form-one.ts";
import { TLogoutActions } from "./actions/logout.ts";

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




