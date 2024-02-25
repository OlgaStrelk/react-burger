import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
  GET_MODAL_INGREDIENT,
  RESET_MODAL_INGREDIENT,
  INCREASE_INGREDIENT_QUANTITY,
  DECREASE_INGREDIENT_QUANTITY,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredient: null,
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
        ingredients: action.payload.map((item) => {
          return { ...item, quantity: 0 };
        }),
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

    case INCREASE_INGREDIENT_QUANTITY: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          action.payload._id === item._id && action.payload.type === "bun"
            ? { ...item, quantity: item.quantity + 2 }
            : action.payload._id === item._id
            ? { ...item, quantity: ++item.quantity }
            : item
        ),
      };
    }

    case INCREASE_INGREDIENT_QUANTITY: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          action.payload._id === item._id && action.payload.type === "bun"
            ? { ...item, quantity: item.quantity - 2 }
            : action.payload._id === item._id
            ? { ...item, quantity: --item.quantity }
            : item
        ),
      };
    }
    default: {
      return state;
    }
  }
};