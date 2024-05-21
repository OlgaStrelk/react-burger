import { TModalActions } from "../actions/modal";
import {
  GET_MODAL_INGREDIENT,
  RESET_MODAL_INGREDIENT,
} from "../constants/ingredients";

export interface ModalState {
  currentIngredient: string | null;
}

const initialState: ModalState = {
  currentIngredient: null,
};

export const modalReducer = (
  state = initialState,
  action: TModalActions
): ModalState => {
  switch (action.type) {
    case GET_MODAL_INGREDIENT: {
      const id = action.payload;
      return {
        ...state,
        currentIngredient: id,
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
