import { ADD_INGREDIENT } from "../actions/ingredients";

const initialState = {
  addedIngredients: {
    buns: null,
    ingredients: [],
  },
};

export const constructorReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};
