import { ENDPOINT, optionsUnAuth, optionsWithAuth } from "../../utils/consts";
import { v4 as uuid } from "uuid";
import { IIngredientsResponse, IOrderResponse, TIngredient, TOrderRequest } from "../../utils/types";
import { handleError, request } from "../../utils/api";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export const GET_MODAL_INGREDIENT = "GET_MODAL_INGREDIENT";
export const RESET_MODAL_INGREDIENT = "RESET_MODAL_INGREDIENT";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const INCREASE_INGREDIENT_QUANTITY = "INCREASE_INGREDIENT_QUANTITY";
export const DECREASE_INGREDIENT_QUANTITY = "DECREASE_INGREDIENT_QUANTITY";
export const RESET_INGREDIENT_QUANTITY = "RESET_INGREDIENT_QUANTITY";

export const MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export const addIngredient = (ingredient: TIngredient) => {
  return { type: ADD_INGREDIENT, payload: { ...ingredient, id: uuid() } };
};
export const deleteIngredient = (id: string) => {
  return { type: DELETE_INGREDIENT, payload: id };
};
export const decreaseQuantity = (id: string) => {
  return { type: DECREASE_INGREDIENT_QUANTITY, payload: id };
};
//@ts-ignore
export const fetchIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  request<IIngredientsResponse>(ENDPOINT.ingredients, { ...optionsUnAuth, method: "GET" })
    .then((res) => {
      console.log(res)
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
    })
    .catch((err) => handleError(GET_INGREDIENTS_FAILED, err, dispatch));
};

export const makeOrder =
  (data: TOrderRequest) => (dispatch: any) => {
    dispatch({ type: MAKE_ORDER_REQUEST });
    request<IOrderResponse>(ENDPOINT.orders, {
      ...optionsWithAuth,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) =>
        dispatch({ type: MAKE_ORDER_SUCCESS, payload: res.order.number })
      )
      .catch((err) => handleError(MAKE_ORDER_FAILED, err, dispatch));
  };
