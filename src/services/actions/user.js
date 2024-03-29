import { request } from "../../utils/consts";
import { ENDPOINT } from "../../utils/consts";

export const RESET_FORM_SET_VALUE = "RESET_FORM_SET_VALUE"

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";
export const resetPassword = (email) => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  request(ENDPOINT.resetPasswordStepOne, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((res) => {
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: RESET_PASSWORD_FAILURE }));
};


export const resetFormValue = (field, value) => ({
  type: RESET_FORM_SET_VALUE,
  field,
  value
}) 