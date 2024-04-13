import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SET_AUTH_CHECKED,
  UPDATE_USER_DATA,
  DELETE_USER,
} from "../actions/user";
import { LOGOUT_REQUEST, LOGOUT_FAILED, LOGOUT_SUCCESS } from "../actions/auth";
const initialState = {
  user: null,
  isAuthChecked: false,
  userRequest: false,
  userFailed: false,
  logoutRequest: false,
  logoutFailed: false,
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
        user: action.payload,
        userRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        logoutRequest: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }

    case DELETE_USER: {
      return {
        ...state,
        user: null,
      };
    }

    case SET_AUTH_CHECKED: {
      return { ...state, isAuthChecked: action.payload };
    }

    case UPDATE_USER_DATA: {
      return { ...state, user: { ...state.user, [action.name]: action.value } };
    }

    default: {
      return state;
    }
  }
};
