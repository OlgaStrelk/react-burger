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

export const resetPasswordStepOne = () => (dispatch, getState) => {
  dispatch({ type: RESET_FORM_ONE_SUBMIT_REQUEST });
  request(ENDPOINT.resetPasswordStepOne, {
    method: "POST",
    body: JSON.stringify(getState().resetForm.form),
  })
    .then((res) => {
      dispatch({ type: RESET_FORM_ONE_SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: RESET_FORM_ONE_SUBMIT_FAILED }));
};

export const resetPasswordStepTwo = () => (dispatch, getState) => {
  dispatch({ type: RESET_FORM_TWO_SUBMIT_REQUEST });
  request(ENDPOINT.resetPasswordStepTwo, {
    method: "POST",
    body: JSON.stringify(getState().resetFormTwo.form),
  })
    .then((res) => {
      dispatch({ type: RESET_FORM_TWO_SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: RESET_FORM_TWO_SUBMIT_FAILED }));
};
