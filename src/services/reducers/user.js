import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_AUTH_CHECKED,
} from "../actions/user";
import { SET_USER_DATA } from "../actions/user";
const initialState = {
  user: { name: "", login: "", password: "" },
  isAuthChecked: false,
  userRequest: false,
  userFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: { ...state, email: action.payload },
        userRequest: false,
      };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }

    case SET_USER_DATA: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case SET_AUTH_CHECKED: {
      return { ...state, isAuthChecked: action.payload };
    }

    default: {
      return state;
    }
  }
};
