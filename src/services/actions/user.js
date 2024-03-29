import { request } from "../../utils/consts";
import { PATHS } from "../../utils/consts";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";
export const resetPassword = (email) => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  request(PATHS.resetPassword, {
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
