import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients.js";
import { constructorReducer } from "./burgerConstructor.js";
import { orderReducer } from "./order.js";
import { modalReducer } from "./modal.js";
import { resetFormReducer } from "./resetForm.js";
import { resetFormTwoReducer } from "./resetFormTwo.js";
import { registerReducer } from "./register.js";
import { loginReducer } from "./login.js";
import { userReducer } from "./user.js";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  modal: modalReducer,
  resetForm: resetFormReducer,
  resetFormTwo: resetFormTwoReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
});
