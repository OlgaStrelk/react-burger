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
//@ts-ignore
export const modalReducer = (state = initialState, action) => {
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
