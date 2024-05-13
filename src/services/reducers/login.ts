import { LOGIN_SET_VALUE } from "../actions/authForms";
import {
  LOGIN_SUBMIT_SUCCESS,
  LOGIN_SUBMIT_FAILED,
  LOGIN_SUBMIT_REQUEST,
} from "../actions/auth";

const initialState = {
  form: {
    email: "",
    password: "",
  },
  loginRequest: false,
  loginFailed: false,
  error: null,
};
//@ts-ignore
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SET_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case LOGIN_SUBMIT_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        loginRequest: false,
      };
    }
    case LOGIN_SUBMIT_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
