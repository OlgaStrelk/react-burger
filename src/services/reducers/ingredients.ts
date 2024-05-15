import { TIngredient } from "../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT_QUANTITY,
  DECREASE_INGREDIENT_QUANTITY,
  RESET_INGREDIENTS_QUANTITY,
} from "../actions/ingredients";

export interface IngredientsState {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  currentIngredient: null | TIngredient;
}
const initialState: IngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredient: null,
};

type TGetIngredientRequestAction = {
  type: typeof GET_INGREDIENTS_REQUEST;
};

type TGetIngredientSuccessAction = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: TIngredient[];
};

type TGetIngredientFailedAction = {
  type: typeof GET_INGREDIENTS_FAILED;
  payload: string;
};

type TIncreaseQuantityAction = {
  type: typeof INCREASE_INGREDIENT_QUANTITY;
  payload: TIngredient;
};
type TDecreaseQuantityAction = {
  type: typeof DECREASE_INGREDIENT_QUANTITY;
  payload: string;
};
type TResetQuantityAction = {
  type: typeof RESET_INGREDIENTS_QUANTITY;
};

type TIngredientsActions =
  | TGetIngredientRequestAction
  | TGetIngredientSuccessAction
  | TGetIngredientFailedAction
  | TIncreaseQuantityAction
  | TDecreaseQuantityAction
  | TResetQuantityAction;

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
) => {
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
