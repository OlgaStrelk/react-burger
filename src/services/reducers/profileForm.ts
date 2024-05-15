import { passwordStub } from "../../utils/consts";
import { TUser, TUserWithPassword } from "../../utils/types";
import {
  CLEAR_PROFILE_FORM,
  EDIT_PROFILE_SET_VALUE,
} from "../actions/authForms";
import {
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
  EDIT_PROFILE_REQUEST,
} from "../actions/user";

export interface ProfileState {
  form: TUserWithPassword;
  editProfileRequest: boolean;
  editProfileFailed: boolean;
}
const initialState: ProfileState = {
  form: {
    name: "",
    email: "",
    password: passwordStub,
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

    case EDIT_PROFILE_REQUEST: {
      return {
        ...state,
        editProfileRequest: true,
        editProfileFailed: false,
      };
    }
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        editProfileRequest: false,
      };
    }
    case EDIT_PROFILE_FAILED: {
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
