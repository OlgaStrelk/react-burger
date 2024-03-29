import { request } from "../../utils/consts";
import { ENDPOINT } from "../../utils/consts";

export const RESET_PASSWORD_FORM_SET_VALUE = "RESET_PASSWORD_FORM_SET_VALUE"

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";
export const resetPassword = (email) => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  request(ENDPOINT.resetPassword, {
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


export const resetPasswordFormValue = (field, value) => ({
  type: RESET_PASSWORD_FORM_SET_VALUE,
  field,
  value
}) 