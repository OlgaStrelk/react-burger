import { TUserWithPassword } from "../../utils/types";
import { TRegisterActions } from "../actions/register";
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

export const registerReducer = (
  state = initialState,
  action: TRegisterActions
): RegisterState => {
  switch (action.type) {
    case REGISTER_SET_VALUE: {
      return {
        ...state,
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
