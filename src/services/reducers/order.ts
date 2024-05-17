import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
} from "../actions/ingredients";

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
