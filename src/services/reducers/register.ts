import { TUserWithPassword } from "../../utils/types";
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/auth";
import { REGISTER_SET_VALUE } from "../constants/auth-forms";

export interface RegisterState {
  form: TUserWithPassword;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
}
const initialState: RegisterState = {
  form: {
    email: "",
    password: "",
    name: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

type TRegisterRequestAction = {
  type: typeof REGISTER_REQUEST;
};

type TRegisterSuccessAction = {
  type: typeof REGISTER_SUCCESS;
};

type TRegisterFailedAction = {
  type: typeof REGISTER_FAILED;
};

type TSetValueAction = {
  type: typeof REGISTER_SET_VALUE;
  field: string;
  value: string;
};

export type TRegisterActions =
  | TRegisterRequestAction
  | TRegisterSuccessAction
  | TRegisterFailedAction
  | TSetValueAction;

export const registerReducer = (
  state = initialState,
  action: TRegisterActions
) => {
  switch (action.type) {
    case REGISTER_SET_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
