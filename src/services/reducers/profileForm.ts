import { CLEAR_PROFILE_FORM, EDIT_PROFILE_SET_VALUE } from "../actions/authForms";
import {
  EDIT_PROFILE_SUBMIT_SUCCESS,
  EDIT_PROFILE_SUBMIT_FAILED,
  EDIT_PROFILE_SUBMIT_REQUEST,
} from "../actions/user";

const initialState = {
  form: {
    name: "",
    email: "",
    password: "01010101",
  },
  editProfileRequest: false,
  editProfileFailed: false,
};
//@ts-ignore
export const editProfileFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE_SET_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case CLEAR_PROFILE_FORM: {
      return {
        form: initialState.form,
      };
    }

    case EDIT_PROFILE_SUBMIT_REQUEST: {
      return {
        ...state,
        editProfileRequest: true,
        editProfileFailed: false,
      };
    }
    case EDIT_PROFILE_SUBMIT_SUCCESS: {
      return {
        ...state,
        editProfileRequest: false,
      };
    }
    case EDIT_PROFILE_SUBMIT_FAILED: {
      return {
        ...state,
        editProfileRequest: false,
        editProfileFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
