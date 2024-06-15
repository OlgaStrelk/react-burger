import { TConstructorIngredient } from "../../utils/types";
import { TBurgerConstructorActions } from "../actions/constructor-ingredients";
import {
  ADD_INGREDIENT,
  SORT_INGREDIENTS,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
} from "../constants/ingredients";

export interface ConstructorState {
  addedIngredients: {
    buns: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}
export const constructorInitialState: ConstructorState = {
  addedIngredients: {
    buns: null,
    ingredients: [],
  },
};

export const constructorReducer = (
  state = constructorInitialState,
  action: TBurgerConstructorActions
): ConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const ingredient = action.payload;

      if (ingredient.type === "bun") {
        return {
          ...state,
          addedIngredients: { ...state.addedIngredients, buns: ingredient },
        };
      } else {
        return {
          ...state,
          addedIngredients: {
            ...state.addedIngredients,
            ingredients: [...state.addedIngredients.ingredients, ingredient],
          },
        };
      }
    }
    case SORT_INGREDIENTS:
      const ingredients = action.payload;
      return {
        ...state,
        addedIngredients: {
          ...state.addedIngredients,
          ingredients: ingredients,
        },
      };

    case DELETE_INGREDIENT: {
      const id = action.payload;
      return {
        ...state,
        addedIngredients: {
          ...state.addedIngredients,
          ingredients: [...state.addedIngredients.ingredients].filter(
            (item) => item.id !== id
          ),
        },
      };
    }

    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        addedIngredients: constructorInitialState.addedIngredients,
      };
    }

    default: {
      return state;
    }
  }
};
