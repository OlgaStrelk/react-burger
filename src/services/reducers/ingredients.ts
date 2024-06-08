import { TIngredient } from "../../utils/types";
import { TIngredientsActions } from "../actions/ingredients";
import {
  DECREASE_INGREDIENT_QUANTITY,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_QUANTITY,
  RESET_INGREDIENTS_QUANTITY,
} from "../constants/ingredients";

export interface IngredientsState {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}
const initialState: IngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): IngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      let ingredients = action.payload;
      return {
        ...state,

        ingredients: ingredients.map((item) => {
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
      let ingredient = action.payload;
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          ingredient.type === "bun" &&
          item.type === "bun" &&
          ingredient._id !== item._id
            ? { ...item, quantity: 0 }
            : ingredient.type === "bun" && ingredient._id === item._id
            ? { ...item, quantity: 2 }
            : ingredient._id === item._id
            ? { ...item, quantity: ++item.quantity }
            : item
        ),
      };
    }

    case DECREASE_INGREDIENT_QUANTITY: {
      let ingredient = action.payload;

      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          ingredient === item._id
            ? { ...item, quantity: --item.quantity }
            : item
        ),
      };
    }

    case RESET_INGREDIENTS_QUANTITY: {
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
