import { v4 as uuid } from "uuid";

import { TConstructorIngredient, TIngredient } from "../../utils/types";
import {
  ADD_INGREDIENT,
  SORT_INGREDIENTS,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
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

export type TBurgerConstructorActions =
  | TAddIngredientAction
  | TSortIngredientAction
  | TDeleteIngredientAction
  | TResetConstructor;

export const sortIngredients = (
  newIngredients: TConstructorIngredient[]
): TSortIngredientAction => {
  return { type: SORT_INGREDIENTS, payload: newIngredients };
};

export const addIngredient = (
  ingredient: TIngredient
): TAddIngredientAction => {
  return { type: ADD_INGREDIENT, payload: { ...ingredient, id: uuid() } };
};
export const deleteIngredient = (id: string): TDeleteIngredientAction => {
  return { type: DELETE_INGREDIENT, payload: id };
};
