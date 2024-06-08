import { passwordStub } from "../../utils/consts";
import { TUserWithPassword } from "../../utils/types";
import { TEditProfileActions } from "../actions/profile-form";
import {
  CLEAR_PROFILE_FORM,
  EDIT_PROFILE_SET_VALUE,
} from "../constants/auth-forms";
import {
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
} from "../constants/user";

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

export const editProfileFormReducer = (
  state = initialState,
  action: TEditProfileActions
): ProfileState => {
  switch (action.type) {
    case EDIT_PROFILE_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case CLEAR_PROFILE_FORM: {
      return {
        ...state,
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
