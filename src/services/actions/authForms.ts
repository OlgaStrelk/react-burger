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
