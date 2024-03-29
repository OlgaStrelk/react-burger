import {
  RESET_FORM_ONE_SET_VALUE,
  RESET_FORM_ONE_SUBMIT,
  RESET_FORM_ONE_SUBMIT_SUCCESS,
  RESET_FORM_ONE_SUBMIT_FAILED,
} from "../actions/authForms";

const initialState = {
  form: {
    email: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

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

    case RESET_FORM_ONE_SUBMIT: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_FORM_ONE_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case RESET_FORM_ONE_SUBMIT_FAILED: {
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