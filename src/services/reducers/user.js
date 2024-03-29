import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../actions/user";

const initialState = {
  user: { name:'',email: "" },
  userRequest: false,
  userFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        user: { ...state, email: action.payload },
        userRequest: false,
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};
