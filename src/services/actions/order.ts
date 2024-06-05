import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth, optionsWithAuth } from "../../utils/consts";
import {
  IGetOrderResponse,
  IMakeOrderResponse,
  TMakeOrderRequest,
  TOrderResponse,
} from "../../utils/types";
import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
} from "../constants/order";
import { AppDispatch } from "../types";

type TMakeOrderRequestAction = {
  type: typeof MAKE_ORDER_REQUEST;
};

type TMakeOrderSuccessAction = {
  type: typeof MAKE_ORDER_SUCCESS;
  payload: number;
};

type TMakeOrderFailedAction = {
  type: typeof MAKE_ORDER_FAILED;
};

type TGetrderRequestAction = {
  type: typeof GET_ORDER_REQUEST;
};

type TGetOrderSuccessAction = {
  type: typeof GET_ORDER_SUCCESS;
  payload: TOrderResponse;
};

type TGetOrderFailedAction = {
  type: typeof GET_ORDER_FAILED;
};

export type TOrderActions =
  | TMakeOrderRequestAction
  | TMakeOrderSuccessAction
  | TMakeOrderFailedAction
  | TGetrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction;

export const makeOrder =
  (data: TMakeOrderRequest) => (dispatch: AppDispatch) => {
    dispatch({ type: MAKE_ORDER_REQUEST });
    request<IMakeOrderResponse>(ENDPOINT.orders, {
      ...optionsWithAuth,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) =>
        dispatch({ type: MAKE_ORDER_SUCCESS, payload: res.order.number })
      )
      .catch((err) => {
        handleError(err);
        dispatch({ type: MAKE_ORDER_FAILED });
      });
  };

export const getOrder = (number: string) => (dispatch: AppDispatch) => {
  dispatch({ type: GET_ORDER_REQUEST });

  request<IGetOrderResponse>(`${ENDPOINT.orders}/${number}`, {
    ...optionsUnAuth,
    method: "GET",
  })
    .then((res) => {
      dispatch({ type: GET_ORDER_SUCCESS, payload: res.orders[0] });
    })
    .catch((err) => {
      handleError(err);
      dispatch({ type: GET_ORDER_FAILED });
    });
};
