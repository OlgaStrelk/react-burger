import { request } from "../../utils/consts";
import { ENDPOINT } from "../../utils/consts";

export const RESET_FORM_ONE_SET_VALUE = "RESET_FORM_ONE_SET_VALUE";
export const RESET_FORM_ONE_SUBMIT_REQUEST = "RESET_FORM_ONE_SUBMIT_REQUEST";
export const RESET_FORM_ONE_SUBMIT_SUCCESS = "RESET_FORM_ONE_SUBMIT_SUCCESS";
export const RESET_FORM_ONE_SUBMIT_FAILED = "RESET_FORM_ONE_SUBMIT_FAILED";
// export const REGISTER_SET_VALUE = "REGISTER_SET_VALUE";



export const RESET_FORM_TWO_SET_VALUE = "RESET_FORM_TWO_SET_VALUE";
export const REGISTER_SET_VALUE = "REGISTER_SET_VALUE";





export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";
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
export const resetPasswordStepOne = (email) => (dispatch) => {
  dispatch({ type: RESET_FORM_ONE_SUBMIT_REQUEST });
  request(ENDPOINT.resetPasswordStepOne, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: email}),
  })
    .then((res) => {
      dispatch({ type: RESET_FORM_ONE_SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: RESET_FORM_ONE_SUBMIT_FAILED }));
};

export const resetPasswordStepTwo = (data) => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  request(ENDPOINT.resetPasswordStepTwo, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: RESET_PASSWORD_FAILURE }));
};
