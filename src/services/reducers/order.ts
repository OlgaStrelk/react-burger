import { TOrder } from "../../utils/types";
import { TOrderActions } from "../actions/order";
import {
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  COUNT_TOTAL,
} from "../constants/order";

export interface OrderState {
  order: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
  total: number;
}

export const orderInitialState: OrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  total: 0,
};

export const orderReducer = (
  state = orderInitialState,
  action: TOrderActions
): OrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      const order = action.payload;
      return {
        ...state,
        order: order,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }

    case COUNT_TOTAL: {
      return {
        ...state,
        total: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
