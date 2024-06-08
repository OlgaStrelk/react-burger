import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients.ts";
import { constructorReducer } from "./burger-constructor.ts";
import { orderMadeReducer } from "./order-made.ts";
import { resetFormReducer } from "./reset-form-one.ts";
import { resetFormTwoReducer } from "./reset-form-two.ts";
import { registerReducer } from "./register.ts";
import { loginReducer } from "./login.ts";
import { userReducer } from "./user.ts";
import { editProfileFormReducer } from "./profile-form.ts";
import { logoutReducer } from "./logout.ts";
import { FeedReducer } from "./ws-feed.ts";
import { orderReducer } from "./order.ts";
import { ProfileOrdersReducer } from "./ws-profile-orders.ts";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  orderMade: orderMadeReducer,
  order: orderReducer,
  resetForm: resetFormReducer,
  resetFormTwo: resetFormTwoReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  profile: editProfileFormReducer,
  logout: logoutReducer,
  wsFeed: FeedReducer,
  wsProfileOrders: ProfileOrdersReducer
});
