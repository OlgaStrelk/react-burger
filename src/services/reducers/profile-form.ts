import { passwordStub } from "../../utils/consts";
import { TUserWithPassword } from "../../utils/types";
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

type TEditProfileRequestAction = {
  type: typeof EDIT_PROFILE_REQUEST;
};

type TEditProfileSuccessAction = {
  type: typeof EDIT_PROFILE_SUCCESS;
};

type TClearProfileFormAction = {
  type: typeof CLEAR_PROFILE_FORM;
};

type TSetValueAction = {
  type: typeof EDIT_PROFILE_SET_VALUE;
  field: string;
  value: string;
};

type TEditProfileFailedAction = {
  type: typeof EDIT_PROFILE_FAILED;
};

export type TEditProfileActions =
  | TEditProfileRequestAction
  | TEditProfileSuccessAction
  | TEditProfileFailedAction
  | TSetValueAction
  | TClearProfileFormAction;

export const editProfileFormReducer = (
  state = initialState,
  action: TEditProfileActions
) => {
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
      console.log("request");
      return {
        ...state,
        editProfileRequest: true,
        editProfileFailed: false,
      };
    }
    case EDIT_PROFILE_SUCCESS: {
      console.log("success");
      return {
        ...state,
        editProfileRequest: false,
      };
    }
    case EDIT_PROFILE_FAILED: {
      console.log("failed");
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
