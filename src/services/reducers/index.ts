import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients.ts";
import { constructorReducer } from "./burger-constructor.ts";
import { orderReducer } from "./order.ts";
import { resetFormReducer } from "./reset-form-one.ts";
import { resetFormTwoReducer } from "./reset-form-two.ts";
import { registerReducer } from "./register.ts";
import { loginReducer } from "./login.ts";
import { userReducer } from "./user.ts";
import { editProfileFormReducer } from "./profile-form.ts";
import { logoutReducer } from "./logout.ts";
import { liveOrdersReducer } from "./ws.ts";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  resetForm: resetFormReducer,
  resetFormTwo: resetFormTwoReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  profile: editProfileFormReducer,
  logout: logoutReducer,
  wsOrders: liveOrdersReducer
});
