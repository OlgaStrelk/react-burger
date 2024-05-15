import { RESET_FORM_TWO_SET_VALUE } from "../actions/authForms";
import {
  RESET_FORM_TWO_SUCCESS,
  RESET_FORM_TWO_FAILED,
  RESET_FORM_TWO_REQUEST,
} from "../actions/auth";

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
//@ts-ignore
export const resetFormTwoReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FORM_TWO_SET_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case RESET_FORM_TWO_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_FORM_TWO_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case RESET_FORM_TWO_FAILED: {
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
