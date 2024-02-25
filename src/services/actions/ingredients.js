import { INGREDIENTS_API_URL } from "../../utils/consts";
import { v4 as uuid } from "uuid";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const GET_MODAL_INGREDIENT = "GET_MODAL_INGREDIENT";
export const RESET_MODAL_INGREDIENT = "RESET_MODAL_INGREDIENT";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILURE = "GET_INGREDIENTS_FAILURE";
export const INCREASE_INGREDIENT_QUANTITY = "INCREASE_INGREDIENT_QUANTITY";
export const DECREASE_INGREDIENT_QUANTITY = "DECREASE_INGREDIENT_QUANTITY";
export const addIngredient = (ingredient) => {
  return { type: ADD_INGREDIENT, payload: { ...ingredient, id: uuid() } };
};

export const fetchIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  fetch(INGREDIENTS_API_URL)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_INGREDIENTS_FAILURE }));
};
