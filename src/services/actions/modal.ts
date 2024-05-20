import { GET_MODAL_INGREDIENT, RESET_MODAL_INGREDIENT } from "../constants/ingredients";

export type TGetModalIngredientAction = {
    readonly type: typeof GET_MODAL_INGREDIENT;
    readonly payload: string;
  };
  
  export type TResetModalIngredientAction = {
    readonly type: typeof RESET_MODAL_INGREDIENT;
  };
  
  export type TModalActions =
    | TGetModalIngredientAction
    | TResetModalIngredientAction;
  
  export const getModalIngredient = (id: string): TGetModalIngredientAction => {
    return { type: GET_MODAL_INGREDIENT, payload: id };
  };
  