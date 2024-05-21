import { TResetFormActions } from "../actions/reset-form-one";
import {
  RESET_PASSWORD_FORM_ONE_REQUEST,
  RESET_PASSWORD_FORM_ONE_SUCCESS,
  RESET_PASSWORD_FORM_ONE_FAILED,
} from "../constants/auth";
import { RESET_PASSWORD_FORM_ONE_SET_VALUE } from "../constants/auth-forms";

export interface ResetFormState {
  form: { email: string };
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
}
const initialState: ResetFormState = {
  form: {
    email: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

export const resetFormReducer = (
  state = initialState,
  action: TResetFormActions
): ResetFormState => {
  switch (action.type) {
    case RESET_PASSWORD_FORM_ONE_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case RESET_PASSWORD_FORM_ONE_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_PASSWORD_FORM_ONE_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case RESET_PASSWORD_FORM_ONE_FAILED: {
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
