import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT_QUANTITY,
  DECREASE_INGREDIENT_QUANTITY,
  RESET_INGREDIENT_QUANTITY,
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
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }

    case INCREASE_INGREDIENT_QUANTITY: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          action.payload.type === "bun" &&
          item.type === "bun" &&
          action.payload._id !== item._id
            ? { ...item, quantity: 0 }
            : action.payload.type === "bun" && action.payload._id === item._id
            ? { ...item, quantity: 2 }
            : action.payload._id === item._id
            ? { ...item, quantity: ++item.quantity }
            : item
        ),
      };
    }

    case DECREASE_INGREDIENT_QUANTITY: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          action.payload === item._id
            ? { ...item, quantity: --item.quantity }
            : item
        ),
      };
    }

    case RESET_INGREDIENT_QUANTITY: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) => {
          return { ...item, quantity: 0 };
        }),
      };
    }

    default: {
      return state;
    }
  }
};
