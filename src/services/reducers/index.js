import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients.js";
import { constructorReducer } from "./burgerConstructor.js";
import {orderReducer} from './order.js'

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  orderReducer,
});
