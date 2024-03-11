import {
  ADD_INGREDIENT,
  SORT_INGREDIENTS,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
} from "../actions/ingredients";

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
            (item) => item.id !== action.payload
          ),
        },
      };
    }

    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        addedIngredients: {
          buns: null,
          ingredients: [],
        },
      };
    }
    
    default: {
      return state;
    }
  }
};
