import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients.ts";
import { constructorReducer } from "./burgerConstructor.ts";
import { orderReducer } from "./order.ts";
import { modalReducer } from "./modal.ts";
import { resetFormReducer } from "./resetForm.ts";
import { resetFormTwoReducer } from "./resetFormTwo.ts";
import { registerReducer } from "./register.ts";
import { loginReducer } from "./login.ts";
import { userReducer } from "./user.ts";
import { editProfileFormReducer } from "./profileForm.ts";

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
  profile: editProfileFormReducer
});
