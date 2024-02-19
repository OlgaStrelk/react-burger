import { INGREDIENTS_API_URL } from "../../utils/consts";

export const FETCH_INGREDIENTS = "FETCH_INGREDIENTS";
export const GET_CONSTRUCTOR_INGREDIENTS = "GET_CONSTRUCTOR_INGREDIENTS";
export const GET_MODAL_INGREDIENT = "GET_MODAL_INGREDIENT";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILURE = "GET_INGREDIENTS_FAILURE";

export const fetchIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  fetch(INGREDIENTS_API_URL)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_INGREDIENTS_FAILURE }));
};
