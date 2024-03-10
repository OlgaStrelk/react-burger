import {
  INGREDIENTS_ENDPOINT,
  API_URL,
  ORDER_ENDPOINT,
} from "../../utils/consts";
import { checkResponse } from "../../utils/consts";
import { v4 as uuid } from "uuid";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export const GET_MODAL_INGREDIENT = "GET_MODAL_INGREDIENT";
export const RESET_MODAL_INGREDIENT = "RESET_MODAL_INGREDIENT";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILURE = "GET_INGREDIENTS_FAILURE";

export const INCREASE_INGREDIENT_QUANTITY = "INCREASE_INGREDIENT_QUANTITY";
export const DECREASE_INGREDIENT_QUANTITY = "DECREASE_INGREDIENT_QUANTITY";

export const MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILURE = "MAKE_ORDER_FAILURE";

export const addIngredient = (ingredient) => {
  return { type: ADD_INGREDIENT, payload: { ...ingredient, id: uuid() } };
};
export const deleteIngredient = (id) => {
  return { type: DELETE_INGREDIENT, payload: id };
};
export const decreaseQuantity = (id) => {
  return { type: DECREASE_INGREDIENT_QUANTITY, payload: id };
};

export const fetchIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  fetch(`${API_URL}${INGREDIENTS_ENDPOINT}`)
    .then(checkResponse)
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_INGREDIENTS_FAILURE }));
};

export const makeOrder = (data) => (dispatch) => {
  dispatch({ type: MAKE_ORDER_REQUEST });
  fetch(`${API_URL}${ORDER_ENDPOINT}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(checkResponse)
    .then((res) =>
      dispatch({ type: MAKE_ORDER_SUCCESS, payload: res.order.number })
    )
    .catch((err) => dispatch({ type: MAKE_ORDER_FAILURE }));
};
