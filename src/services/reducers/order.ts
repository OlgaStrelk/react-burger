import { TOrderResponse } from "../../utils/types";
import { TOrderActions } from "../actions/order";
import {
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
} from "../constants/order";

export interface OrderState {
  order: TOrderResponse | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: OrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (
  state = initialState,
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
    default: {
      return state;
    }
  }
};
