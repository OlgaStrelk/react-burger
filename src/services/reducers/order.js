import { MAKE_ORDER_REQUEST } from "../actions/ingredients";
const initialState = {
  order: {},
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return { order: action.payload };
    }
    default: {
      return state;
    }
  }
};
