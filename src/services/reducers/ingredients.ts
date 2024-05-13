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
//@ts-ignore
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
        //@ts-ignore
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
          //@ts-ignore
          item.type === "bun" &&
          //@ts-ignore
          action.payload._id !== item._id
            ? //@ts-ignore
              { ...item, quantity: 0 }
            : //@ts-ignore
            action.payload.type === "bun" && action.payload._id === item._id
            ? //@ts-ignore
              { ...item, quantity: 2 }
            : //@ts-ignore
            action.payload._id === item._id
            ? //@ts-ignore
              { ...item, quantity: ++item.quantity }
            : item
        ),
      };
    }

    case DECREASE_INGREDIENT_QUANTITY: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          //@ts-ignore
          action.payload === item._id
            ? //@ts-ignore
              { ...item, quantity: --item.quantity }
            : item
        ),
      };
    }

    case RESET_INGREDIENT_QUANTITY: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) => {
          //@ts-ignore
          return { ...item, quantity: 0 };
        }),
      };
    }

    default: {
      return state;
    }
  }
};
