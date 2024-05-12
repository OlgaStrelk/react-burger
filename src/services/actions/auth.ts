import { updateUser } from "./user";
import { optionsUnAuth, optionsWithAuth } from "../../utils/consts";
import { ENDPOINT } from "../../utils/consts";
import {
  IResetPasswordResponse,
  TAuthorizationResonse,
} from "../../utils/types";
import { CLEAR_PROFILE_FORM } from "./authForms";
import { handleError, request } from "../../utils/api";

export const REGISTER_SUBMIT_REQUEST = "REGISTER_SUBMIT_REQUEST";
export const REGISTER_SUBMIT_SUCCESS = "REGISTER_SUBMIT_SUCCESS";
export const REGISTER_SUBMIT_FAILED = "REGISTER_SUBMIT_FAILED";

export const LOGIN_SUBMIT_SUCCESS = "LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_FAILED = "LOGIN_SUBMIT_FAILED";
export const LOGIN_SUBMIT_REQUEST = "LOGIN_SUBMIT_REQUEST";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const RESET_FORM_ONE_SUBMIT_REQUEST = "RESET_FORM_ONE_SUBMIT_REQUEST";
export const RESET_FORM_ONE_SUBMIT_SUCCESS = "RESET_FORM_ONE_SUBMIT_SUCCESS";
export const RESET_FORM_ONE_SUBMIT_FAILED = "RESET_FORM_ONE_SUBMIT_FAILED";

export const RESET_FORM_TWO_SUBMIT_REQUEST = "RESET_FORM_TWO_SUBMIT_REQUEST";
export const RESET_FORM_TWO_SUBMIT_SUCCESS = "RESET_FORM_TWO_SUBMIT_SUCCESS";
export const RESET_FORM_TWO_SUBMIT_FAILED = "RESET_FORM_TWO_SUBMIT_FAILED";

//@ts-ignore
export const register = () => async (dispatch, getState) => {
  dispatch({ type: REGISTER_SUBMIT_REQUEST });
  const data = await request<TAuthorizationResonse>(ENDPOINT.register, {
    ...optionsUnAuth,
    method: "POST",
    body: JSON.stringify(getState().register.form),
  })
    .then((data) => {
      dispatch({ type: REGISTER_SUBMIT_SUCCESS });
      return data;
    })
    .catch((err) => handleError(REGISTER_SUBMIT_FAILED, err, dispatch));

  if (data && data.success) {
    //@ts-ignore
    dispatch(updateUser(data.user));
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }
};

export const login =
  () =>
  //@ts-ignore
  async (dispatch, getState): void => {
    dispatch({ type: LOGIN_SUBMIT_REQUEST });
    const data = await request<TAuthorizationResonse>(ENDPOINT.login, {
      ...optionsUnAuth,
      method: "POST",
      body: JSON.stringify(getState().login.form),
    })
      .then((data) => {
        dispatch({ type: LOGIN_SUBMIT_SUCCESS });
        return data;
      })
      .catch((err) => handleError(LOGIN_SUBMIT_FAILED, err, dispatch));
    if (data && data.success) {
      //@ts-ignore

      const value = getState().login.form.password;
      dispatch(updateUser({ ...data.user, password: value }));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
  };

//@ts-ignore
export const resetPasswordStepOne = () => (dispatch, getState) => {
  dispatch({ type: RESET_FORM_ONE_SUBMIT_REQUEST });
  request(ENDPOINT.resetPasswordStepOne, {
    ...optionsUnAuth,
    method: "POST",
    body: JSON.stringify(getState().resetForm.form),
  })
    .then(() => {
      dispatch({ type: RESET_FORM_ONE_SUBMIT_SUCCESS });
    })
    .catch((err) => handleError(RESET_FORM_ONE_SUBMIT_FAILED, err, dispatch));
};
//@ts-ignore
export const resetPasswordStepTwo = () => (dispatch, getState) => {
  dispatch({ type: RESET_FORM_TWO_SUBMIT_REQUEST });
  request<IResetPasswordResponse>(ENDPOINT.resetPasswordStepTwo, {
    ...optionsUnAuth,
    method: "POST",
    body: JSON.stringify(getState().resetFormTwo.form),
  })
    .then(() => {
      dispatch({ type: RESET_FORM_TWO_SUBMIT_SUCCESS });
    })
    .catch((err) => handleError(RESET_FORM_TWO_SUBMIT_FAILED, err, dispatch));
};

//@ts-ignore
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  request<IResetPasswordResponse>(ENDPOINT.logout, {
    ...optionsWithAuth,
    method: "POST",
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  })
    .then(() => {
      dispatch({ type: LOGOUT_SUCCESS });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch({ type: CLEAR_PROFILE_FORM });
    })
    .catch((err) => handleError(LOGOUT_FAILED, err, dispatch));
};
