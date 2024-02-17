import { FETCH_INGREDIENTS } from "../actions/ingredients";

const initialState = {
  ingredients: [],
  addedIngredients: [],
  currentIngredient: {},
  order: {},
};


export const ingredientsReducer =(state = initialState, action)=>{
  switch (action.type) {
    case FETCH_INGREDIENTS:
    {}

    default:
      return state
  }
}