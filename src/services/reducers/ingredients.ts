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
export const ingredientsInitialState: IngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = ingredientsInitialState,
  action: TIngredientsActions
): IngredientsState => {
  
  const newIngredients: TIngredient[] = JSON.parse(
    JSON.stringify(state.ingredients)
  );

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

        ingredients: ingredients.map((newIngredient) => {
          return { ...newIngredient, quantity: 0 };
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
      const ingredient = action.payload;
      return {
        ...state,
        ingredients: newIngredients.map((newIngredient) =>
          ingredient.type === "bun" &&
          newIngredient.type === "bun" &&
          ingredient._id !== newIngredient._id
            ? { ...newIngredient, quantity: 0 }
            : ingredient.type === "bun" && ingredient._id === newIngredient._id
            ? { ...newIngredient, quantity: 2 }
            : ingredient._id === newIngredient._id
            ? { ...newIngredient, quantity: ++newIngredient.quantity }
            : newIngredient
        ),
      };
    }

    case DECREASE_INGREDIENT_QUANTITY: {
      const ingredient = action.payload;

      return {
        ...state,
        ingredients: newIngredients.map((newIngredient) =>
          ingredient === newIngredient._id
            ? { ...newIngredient, quantity: --newIngredient.quantity }
            : newIngredient
        ),
      };
    }

    case RESET_INGREDIENTS_QUANTITY: {
      return {
        ...state,
        ingredients: newIngredients.map((newIngredient) => {
          return { ...newIngredient, quantity: 0 };
        }),
      };
    }

    default: {
      return state;
    }
  }
};
