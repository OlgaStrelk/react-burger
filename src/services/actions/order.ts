import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsWithAuth } from "../../utils/consts";
import { TOrderRequest, IOrderResponse } from "../../utils/types";
import { MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from "../constants/order";

type TOrderRequestAction = {
    type: typeof MAKE_ORDER_REQUEST;
  };
  
  type TOrderSuccessAction = {
    type: typeof MAKE_ORDER_SUCCESS;
    payload: { number: number };
  };
  
  type TOrderFailedAction = {
    type: typeof MAKE_ORDER_FAILED;
  };
  
  export type TOrderActions =
    | TOrderRequestAction
    | TOrderSuccessAction
    | TOrderFailedAction;


  
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
