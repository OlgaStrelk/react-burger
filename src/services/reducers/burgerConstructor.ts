import { PayloadAction } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient } from "../../utils/types";
import {
  ADD_INGREDIENT,
  SORT_INGREDIENTS,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
} from "../actions/ingredients";
export interface ConstructorState {
  addedIngredients: { buns: TIngredient | null; ingredients: TIngredient[] };
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
  payload: TIngredient[];
};

type TDeleteIngredientAction = {
  type: typeof DELETE_INGREDIENT;
  payload: string;
};

type TResetConstructor = {
  type: typeof RESET_CONSTRUCTOR;
};

type TBurgerConstructorActions =
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
      if (action.payload.type === "bun") {
        return {
          ...state,
          addedIngredients: { ...state.addedIngredients, buns: action.payload },
        };
      } else {
        return {
          ...state,
          addedIngredients: {
            ...state.addedIngredients,
            ingredients: [
              ...state.addedIngredients.ingredients,
              action.payload,
            ],
          },
        };
      }
    }
    case SORT_INGREDIENTS:
      return {
        ...state,
        addedIngredients: {
          ...state.addedIngredients,
          ingredients: action.payload,
        },
      };

    case DELETE_INGREDIENT: {
      return {
        ...state,
        addedIngredients: {
          ...state.addedIngredients,
          ingredients: [...state.addedIngredients.ingredients].filter(
            //@ts-ignore
            (item) => item.id !== action.payload
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
