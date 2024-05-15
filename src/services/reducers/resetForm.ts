import { RESET_FORM_ONE_SET_VALUE } from "../actions/authForms";

import {
  RESET_FORM_ONE_SUCCESS,
  RESET_FORM_ONE_FAILED,
  RESET_FORM_ONE_REQUEST,
} from "../actions/auth";

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
//@ts-ignore
export const resetFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FORM_ONE_SET_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case RESET_FORM_ONE_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_FORM_ONE_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case RESET_FORM_ONE_FAILED: {
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
