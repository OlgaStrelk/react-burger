import { TIngredient } from "../../utils/types";
import {
  GET_MODAL_INGREDIENT,
  RESET_MODAL_INGREDIENT,
} from "../constants/ingredients";

export interface ModalState {
  currentIngredient: TIngredient | null;
}
const initialState: ModalState = {
  currentIngredient: null,
};

type TGetModalIngredientAction = {
  type: typeof GET_MODAL_INGREDIENT;
  payload: string;
};

type TResetModalIngredientAction = {
  type: typeof RESET_MODAL_INGREDIENT;
};

export const getModalIngredient = (id: string) => {
  return { type: GET_MODAL_INGREDIENT, payload: id };
};

export type TModalActions =
  | TGetModalIngredientAction
  | TResetModalIngredientAction;

export const modalReducer = (state = initialState, action: TModalActions) => {
  switch (action.type) {
    case GET_MODAL_INGREDIENT: {
      const ingredient = action.payload;
      return {
        ...state,
        currentIngredient: ingredient,
      };
    }

    case RESET_MODAL_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
