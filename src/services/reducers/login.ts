import { LOGIN_SET_VALUE } from "../actions/authForms";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
} from "../actions/auth";
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

type TLoginRequestAction = {
  type: typeof LOGIN_REQUEST;
};

type TGetIngredientSuccessAction = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: TIngredient[];
};

type TGetIngredientFailedAction = {
  type: typeof GET_INGREDIENTS_FAILED;
  payload: string;
};

type TSetValueAction = {
  type: typeof LOGIN_SET_VALUE;
  field: string;
  value: string;
};

type TLoginActions =
  | TLoginRequestAction
  | TGetIngredientSuccessAction
  | TGetIngredientFailedAction
  |TSetValueAction;

export const loginReducer = (state = initialState, action: TLoginActions) => {
  switch (action.type) {
    case LOGIN_SET_VALUE: {
      return {
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
