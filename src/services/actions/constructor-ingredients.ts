import { v4 as uuid } from "uuid";

import { TConstructorIngredient, TIngredient } from "../../utils/types";
import { ADD_INGREDIENT, SORT_INGREDIENTS, DELETE_INGREDIENT, RESET_CONSTRUCTOR, INCREASE_INGREDIENT_QUANTITY, DECREASE_INGREDIENT_QUANTITY } from "../constants/ingredients";

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

    export const sortIngredients = (newIngredients: TConstructorIngredient[]) => {
        return { type: SORT_INGREDIENTS, payload: newIngredients };
      };
      
      export const increaseQuantity = (ingredient: TConstructorIngredient) => {
        return { type: INCREASE_INGREDIENT_QUANTITY, payload: ingredient };
      };
      
      export const addIngredient = (ingredient: TIngredient) => {
        return { type: ADD_INGREDIENT, payload: { ...ingredient, id: uuid() } };
      };
      export const deleteIngredient = (id: string) => {
        return { type: DELETE_INGREDIENT, payload: id };
      };
      export const decreaseQuantity = (id: string) => {
        return { type: DECREASE_INGREDIENT_QUANTITY, payload: id };
      };