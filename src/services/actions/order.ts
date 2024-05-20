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