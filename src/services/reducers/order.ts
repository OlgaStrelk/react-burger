import { TOrderActions } from "../actions/order";
import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED } from "../constants/order";

export interface OrderState {
  order: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: OrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case MAKE_ORDER_SUCCESS: {
      const orderNumber = action.payload;
      return {
        ...state,
        order: orderNumber,
        orderRequest: false,
      };
    }
    case MAKE_ORDER_FAILED: {
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
