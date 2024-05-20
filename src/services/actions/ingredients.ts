import { ENDPOINT, optionsUnAuth, optionsWithAuth } from "../../utils/consts";
import { v4 as uuid } from "uuid";
import {
  IIngredientsResponse,
  IOrderResponse,
  TConstructorIngredient,
  TIngredient,
  TOrderRequest,
} from "../../utils/types";
import { handleError, request } from "../../utils/api";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  DECREASE_INGREDIENT_QUANTITY,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  SORT_INGREDIENTS,
  INCREASE_INGREDIENT_QUANTITY,
} from "../constants/ingredients";

export const sortIngredients = (newIngredients: TConstructorIngredient[]) => {
  return { type: SORT_INGREDIENTS, payload: newIngredients };
};

export const increaseQuantity = (ingredient: TConstructorIngredient) => {
  return { type: INCREASE_INGREDIENT_QUANTITY, payload: ingredient };
};

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
  request<IIngredientsResponse>(ENDPOINT.ingredients, {
    ...optionsUnAuth,
    method: "GET",
  })
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
    })
    .catch((err) => handleError(GET_INGREDIENTS_FAILED, err, dispatch));
};

export const makeOrder = (data: TOrderRequest) => (dispatch: any) => {
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
