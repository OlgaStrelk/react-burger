import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
  GET_MODAL_INGREDIENT,
  RESET_MODAL_INGREDIENT,
  ADD_INGREDIENT,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  addedIngredients: [],
  currentIngredient: null,
  order: {},
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILURE: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    case GET_MODAL_INGREDIENT: {
      return {
        ...state,
        currentIngredient: state.ingredients.find(
          (item) => item._id === action.payload
        ),
      };
    }

    case RESET_MODAL_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }

    case ADD_INGREDIENT: {
      return {
        ...state,
        addedIngredients: [...state.addedIngredients, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
