import {
  CLEAR_PROFILE_FORM,
  EDIT_PROFILE_SET_VALUE,
} from "../constants/auth-forms";
import {
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
} from "../constants/user";

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

export const editProfileFormValue = (field: string, value: string) => ({
  type: EDIT_PROFILE_SET_VALUE,
  field,
  value,
});
