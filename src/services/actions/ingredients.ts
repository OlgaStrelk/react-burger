import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth, optionsWithAuth } from "../../utils/consts";
import {
  IIngredientsResponse,
  TOrderRequest,
  IOrderResponse,
} from "../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
} from "../constants/ingredients";

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
