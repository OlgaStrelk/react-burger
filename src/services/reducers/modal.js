import {
  RESET_MODAL_INGREDIENT,
  GET_MODAL_INGREDIENT,
} from "../actions/ingredients";

const initialState = {
  currentIngredient: null,
};

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
