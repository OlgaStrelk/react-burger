import { TLoginActions } from "../actions/login";
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/auth";
import { LOGIN_SET_VALUE } from "../constants/auth-forms";

export interface LoginState {
  form: {
    email: string;
    password: string;
  };
  loginRequest: boolean;
  loginFailed: boolean;
}
const initialState: LoginState = {
  form: {
    email: "",
    password: "",
  },
  loginRequest: false,
  loginFailed: false,
};

export const loginReducer = (
  state = initialState,
  action: TLoginActions
): LoginState => {
  switch (action.type) {
    case LOGIN_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        loginRequest: false,
      };
    }
    case LOGIN_FAILED: {
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
