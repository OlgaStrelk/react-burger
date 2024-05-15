import { TUserWithPassword } from "../../utils/types";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
} from "../actions/auth";
import { REGISTER_SET_VALUE } from "../actions/authForms";
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
//@ts-ignore
export const registerReducer = (state = initialState, action) => {
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
