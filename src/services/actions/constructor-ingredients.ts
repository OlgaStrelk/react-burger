import { v4 as uuid } from "uuid";

import { TConstructorIngredient, TIngredient } from "../../utils/types";
import {
  ADD_INGREDIENT,
  SORT_INGREDIENTS,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  INCREASE_INGREDIENT_QUANTITY,
  DECREASE_INGREDIENT_QUANTITY,
  RESET_INGREDIENTS_QUANTITY,
} from "../constants/ingredients";

type TAddIngredientAction = {
  type: typeof ADD_INGREDIENT;
  payload: TConstructorIngredient;
};

type TSortIngredientAction = {
  type: typeof SORT_INGREDIENTS;
  payload: TConstructorIngredient[];
};

type TDeleteIngredientAction = {
  type: typeof DELETE_INGREDIENT;
  payload: string;
};

type TResetConstructor = {
  type: typeof RESET_CONSTRUCTOR;
};

type TIncreaseQuantityAction = {
  type: typeof INCREASE_INGREDIENT_QUANTITY;
  payload: TConstructorIngredient;
};
type TDecreaseQuantityAction = {
  type: typeof DECREASE_INGREDIENT_QUANTITY;
  payload: string;
};
type TResetQuantityAction = {
  type: typeof RESET_INGREDIENTS_QUANTITY;
};

export type TBurgerConstructorActions =
  | TAddIngredientAction
  | TSortIngredientAction
  | TDeleteIngredientAction
  | TResetConstructor
  | TIncreaseQuantityAction
  | TDecreaseQuantityAction
  | TResetQuantityAction;

export const sortIngredients = (
  newIngredients: TConstructorIngredient[]
): TSortIngredientAction => {
  return { type: SORT_INGREDIENTS, payload: newIngredients };
};

export const increaseQuantity = (
  ingredient: TConstructorIngredient
): TIncreaseQuantityAction => {
  return { type: INCREASE_INGREDIENT_QUANTITY, payload: ingredient };
};

export const addIngredient = (
  ingredient: TIngredient
): TAddIngredientAction => {
  return { type: ADD_INGREDIENT, payload: { ...ingredient, id: uuid() } };
};
export const deleteIngredient = (id: string): TDeleteIngredientAction => {
  return { type: DELETE_INGREDIENT, payload: id };
};
export const decreaseQuantity = (id: string): TDecreaseQuantityAction => {
  return { type: DECREASE_INGREDIENT_QUANTITY, payload: id };
};
