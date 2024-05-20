export const RESET_PASSWORD_FORM_ONE_SET_VALUE: "RESET_PASSWORD_FORM_ONE_SET_VALUE" =
  "RESET_PASSWORD_FORM_ONE_SET_VALUE";

export const RESET_PASSWORD_FORM_TWO_SET_VALUE: "RESET_PASSWORD_FORM_TWO_SET_VALUE" =
  "RESET_PASSWORD_FORM_TWO_SET_VALUE";

export const REGISTER_SET_VALUE: "REGISTER_SET_VALUE" = "REGISTER_SET_VALUE";

export const LOGIN_SET_VALUE: "LOGIN_SET_VALUE" = "LOGIN_SET_VALUE";

export const EDIT_PROFILE_SET_VALUE: "EDIT_PROFILE_SET_VALUE" =
  "EDIT_PROFILE_SET_VALUE";

export const CLEAR_PROFILE_FORM = "CLEAR_PROFILE_FORM";

export const editProfileFormValue = (field: string, value: string) => ({
  type: EDIT_PROFILE_SET_VALUE,
  field,
  value,
});

export const resetPasswordOneFormValue = (field: string, value: string) => ({
  type: RESET_PASSWORD_FORM_ONE_SET_VALUE,
  field,
  value,
});

export const resetPasswordTwoFormValue = (field: string, value: string) => ({
  type: RESET_PASSWORD_FORM_TWO_SET_VALUE,
  field,
  value,
});

export const registerFormValue = (field: string, value: string) => ({
  type: REGISTER_SET_VALUE,
  field,
  value,
});

export const loginFormValue = (field: string, value: string) => ({
  type: LOGIN_SET_VALUE,
  field,
  value,
});
