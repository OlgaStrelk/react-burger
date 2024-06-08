import { TResetFormTwoActions } from "../actions/reset-form-two";
import {
  RESET_PASSWORD_FORM_TWO_REQUEST,
  RESET_PASSWORD_FORM_TWO_SUCCESS,
  RESET_PASSWORD_FORM_TWO_FAILED,
} from "../constants/auth";
import { RESET_PASSWORD_FORM_TWO_SET_VALUE } from "../constants/auth-forms";

export interface ResetFormTwoState {
  form: { password: string; token: string };
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
}

const initialState: ResetFormTwoState = {
  form: {
    password: "",
    token: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

export const resetFormTwoReducer = (
  state = initialState,
  action: TResetFormTwoActions
): ResetFormTwoState => {
  switch (action.type) {
    case RESET_PASSWORD_FORM_TWO_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case RESET_PASSWORD_FORM_TWO_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_PASSWORD_FORM_TWO_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case RESET_PASSWORD_FORM_TWO_FAILED: {
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
