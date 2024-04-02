import { request, ENDPOINT } from "../../utils/consts";
export const RESET_FORM_ONE_SET_VALUE = "RESET_FORM_ONE_SET_VALUE";
export const RESET_FORM_ONE_SUBMIT_REQUEST = "RESET_FORM_ONE_SUBMIT_REQUEST";
export const RESET_FORM_ONE_SUBMIT_SUCCESS = "RESET_FORM_ONE_SUBMIT_SUCCESS";
export const RESET_FORM_ONE_SUBMIT_FAILED = "RESET_FORM_ONE_SUBMIT_FAILED";

export const RESET_FORM_TWO_SET_VALUE = "RESET_FORM_TWO_SET_VALUE";
export const RESET_FORM_TWO_SUBMIT_REQUEST = "RESET_FORM_TWO_SUBMIT_REQUEST";
export const RESET_FORM_TWO_SUBMIT_SUCCESS = "RESET_FORM_TWO_SUBMIT_SUCCESS";
export const RESET_FORM_TWO_SUBMIT_FAILED = "RESET_FORM_TWO_SUBMIT_FAILED";

export const REGISTER_SET_VALUE = "REGISTER_SET_VALUE";

export const LOGIN_SET_VALUE = "LOGIN_SET_VALUE";

export const EDIT_PROFILE_SET_VALUE="EDIT_PROFILE_SET_VALUE"

export const editProfileFormValue = (field, value) => ({
  type: EDIT_PROFILE_SET_VALUE,
  field,
  value,
});

export const resetPasswordOneFormValue = (field, value) => ({
  type: RESET_FORM_ONE_SET_VALUE,
  field,
  value,
});

export const resetPasswordTwoFormValue = (field, value) => ({
  type: RESET_FORM_TWO_SET_VALUE,
  field,
  value,
});

export const registerFormValue = (field, value) => ({
  type: REGISTER_SET_VALUE,
  field,
  value,
});

export const loginFormValue = (field, value) => ({
  type: LOGIN_SET_VALUE,
  field,
  value,
});


