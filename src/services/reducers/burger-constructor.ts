import { TConstructorIngredient } from "../../utils/types";
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
const initialState: ConstructorState = {
  addedIngredients: {
    buns: null,
    ingredients: [],
  },
};

type TAddIngredientAction = {
  type: typeof ADD_INGREDIENT;
  payload: TConstructorIngredient;
};

type TSortIngredientAction = {
  type: typeof SORT_INGREDIENTS;
  payload: TConstructorIngredient[];
};

type TDeleteIngredientAction = {
  type: typeof DELETE_INGREDIENT;
  payload: string;
};

type TResetConstructor = {
  type: typeof RESET_CONSTRUCTOR;
};

export type TBurgerConstructorActions =
  | TAddIngredientAction
  | TSortIngredientAction
  | TDeleteIngredientAction
  | TResetConstructor;

export const constructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
) => {
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
        addedIngredients: initialState.addedIngredients,
      };
    }

    default: {
      return state;
    }
  }
};
