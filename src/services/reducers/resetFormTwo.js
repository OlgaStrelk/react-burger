import { RESET_FORM_TWO_SET_VALUE } from "../actions/authForms";
import {
  RESET_FORM_TWO_SUBMIT_SUCCESS,
  RESET_FORM_TWO_SUBMIT_FAILED,
  RESET_FORM_TWO_SUBMIT_REQUEST,
} from "../actions/auth";
const initialState = {
  form: {
    password: "",
    token: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

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

    case RESET_FORM_TWO_SUBMIT_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_FORM_TWO_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case RESET_FORM_TWO_SUBMIT_FAILED: {
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
