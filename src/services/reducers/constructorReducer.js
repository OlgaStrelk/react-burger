import { ADD_INGREDIENT } from "../actions/ingredients";

const initialState = {
  addedIngredients: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      // const  state.ingredients.find((item)=>item._id===action.payload._id)
      return {
        ...state,
        addedIngredients: [...state.addedIngredients, action.payload],
        //   ingredients: [...state.ingredients, state.ingredients.find((item)=>item._id===action.payload._id){...state, }],
      };
    }
    default: {
      return state;
    }
  }
};
