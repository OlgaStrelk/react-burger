import { request } from "../../utils/consts";
import { ENDPOINT } from "../../utils/consts";

export const RESET_FORM_ONE_SET_VALUE = "RESET_FORM_ONE_SET_VALUE";
export const RESET_FORM_ONE_SUBMIT_REQUEST = "RESET_FORM_ONE_SUBMIT_REQUEST";
export const RESET_FORM_ONE_SUBMIT_SUCCESS = "RESET_FORM_ONE_SUBMIT_SUCCESS";
export const RESET_FORM_ONE_SUBMIT_FAILED = "RESET_FORM_ONE_SUBMIT_FAILED";

export const RESET_FORM_TWO_SET_VALUE = "RESET_FORM_TWO_SET_VALUE";
export const RESET_FORM_TWO_SUBMIT_REQUEST = "RESET_FORM_TWO_SUBMIT_REQUEST";
export const RESET_FORM_TWO_SUBMIT_SUCCESS = "RESET_FORM_TWO_SUBMIT_SUCCESS";
export const RESET_FORM_TWO_SUBMIT_FAILED = "RESET_FORM_TWO_SUBMIT_FAILED";

export const REGISTER_SET_VALUE = "REGISTER_SET_VALUE";
export const REGISTER_SUBMIT_REQUEST = "REGISTER_SUBMIT_REQUEST";
export const REGISTER_SUBMIT_SUCCESS = "REGISTER_SUBMIT_SUCCESS";
export const REGISTER_SUBMIT_FAILED = "REGISTER_SUBMIT_FAILED";

export const LOGIN_SET_VALUE = "LOGIN_SET_VALUE";
export const LOGIN_SUBMIT_SUCCESS = "LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_FAILED = "LOGIN_SUBMIT_FAILED";
export const LOGIN_SUBMIT_REQUEST = "LOGIN_SUBMIT_REQUEST";

export const SET_USER_DATA = "SET_USER_DATA";

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

export const register = () => async (dispatch, getState) => {
  dispatch({ type: REGISTER_SUBMIT_REQUEST });
  const data = await request(ENDPOINT.register, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getState().register.form),
  })
    .then((data) => {
      dispatch({ type: REGISTER_SUBMIT_SUCCESS });
      return data;
    })
    .catch((err) => dispatch({ type: REGISTER_SUBMIT_FAILED }));
  if (data.success) {
    dispatch({ type: SET_USER_DATA, payload: data.user });
    //реализовать работу с токенами
  }
};

export const login = () => async (dispatch, getState) => {
  dispatch({ type: LOGIN_SUBMIT_REQUEST });
  await request(ENDPOINT.login, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getState().login.form),
  })
    .then((data) => {
      dispatch({ type: LOGIN_SUBMIT_SUCCESS });
    })
    .catch((err) => dispatch({ type: LOGIN_SUBMIT_FAILED }));
};
