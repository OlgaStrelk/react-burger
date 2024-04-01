import {
  REGISTER_SUBMIT_SUCCESS,
  REGISTER_SUBMIT_FAILED,
  REGISTER_SUBMIT_REQUEST,
} from "../actions/auth";
import { REGISTER_SET_VALUE } from "../actions/authForms";

const initialState = {
  form: {
    email: "",
    password: "",
    name: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

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

    case REGISTER_SUBMIT_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case REGISTER_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case REGISTER_SUBMIT_FAILED: {
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
