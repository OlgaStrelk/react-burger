import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth, optionsWithAuth } from "../../utils/consts";
import {
  IGetOrderResponse,
  IMakeOrderResponse,
  TIngredient,
  TMakeOrderRequest,
  TOrder,
} from "../../utils/types";
import {
  COUNT_TOTAL,
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
  payload: TOrder;
};

type TGetOrderFailedAction = {
  type: typeof GET_ORDER_FAILED;
};

type TOrderSumAction = {
  type: typeof COUNT_TOTAL;
  payload: number;
};

export type TOrderActions =
  | TMakeOrderRequestAction
  | TMakeOrderSuccessAction
  | TMakeOrderFailedAction
  | TGetrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction
  | TOrderSumAction;

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

export const getOrder =
  (number: string) => (dispatch: AppDispatch, getState: any) => {
    dispatch({ type: GET_ORDER_REQUEST });

    request<IGetOrderResponse>(`${ENDPOINT.orders}/${number}`, {
      ...optionsUnAuth,
      method: "GET",
    })
      .then((res) => {
        const order = res.orders[0];
        const countedIds = order.ingredients.reduce(
          (acc: { [id: string]: number }, i) => {
            if (acc.hasOwnProperty(i)) {
              acc[i] += 1;
            } else {
              acc[i] = 1;
            }
            return acc;
          },
          {}
        );

        let array: TIngredient[] = [];
        for (let key in countedIds) {
          let ingredient = getState().ingredients.ingredients.find(
            (ing) => ing._id === key
          );
          if (ingredient) {
            array.push({
              ...ingredient,
              quantity: ingredient.type === "bun" ? 2 : countedIds[key],
            });
          }
        }

        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: {
            ...order,
            ingredients: array,
            status:
              order.status == "created"
                ? "Создан"
                : order.status == "done"
                ? "Выполнен"
                : order.status == "pending"
                ? "Готовится"
                : "Создан",
          },
        });
      })
      .catch((err) => {
        handleError(err);
        dispatch({ type: GET_ORDER_FAILED });
      });
  };
