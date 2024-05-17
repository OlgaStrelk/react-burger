import { TIngredient } from "../../utils/types";
import {
  RESET_MODAL_INGREDIENT,
  GET_MODAL_INGREDIENT,
} from "../actions/ingredients";

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

export type TModalActions = TGetModalIngredientAction | TResetModalIngredientAction;

export const modalReducer = (state = initialState, action: TModalActions) => {
  switch (action.type) {
    case GET_MODAL_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
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
