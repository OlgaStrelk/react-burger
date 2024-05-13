import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
} from "../actions/ingredients";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};
//@ts-ignore
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
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
