import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients.js";
import { constructorReducer } from "./constructorReducer.js";
import {orderReducer} from './orderReducer.js'

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  orderReducer,
});
