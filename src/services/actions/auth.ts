import { DELETE_USER, updateUser } from "./user";
import { optionsUnAuth, optionsWithAuth } from "../../utils/consts";
import { ENDPOINT } from "../../utils/consts";
import {
  IResetPasswordResponse,
  TAuthorizationResonse,
} from "../../utils/types";
import { CLEAR_PROFILE_FORM } from "./authForms";
import { handleError, request } from "../../utils/api";

export const RESET_PASSWORD_FORM_ONE_REQUEST: "RESET_PASSWORD_FORM_ONE_REQUEST" =
  "RESET_PASSWORD_FORM_ONE_REQUEST";
export const RESET_PASSWORD_FORM_ONE_SUCCESS: "RESET_PASSWORD_FORM_ONE_SUCCESS" =
  "RESET_PASSWORD_FORM_ONE_SUCCESS";
export const RESET_PASSWORD_FORM_ONE_FAILED: "RESET_PASSWORD_FORM_ONE_FAILED" =
  "RESET_PASSWORD_FORM_ONE_FAILED";

export const RESET_PASSWORD_FORM_TWO_REQUEST: "RESET_PASSWORD_FORM_TWO_REQUEST" =
  "RESET_PASSWORD_FORM_TWO_REQUEST";
export const RESET_PASSWORD_FORM_TWO_SUCCESS: "RESET_PASSWORD_FORM_TWO_SUCCESS" =
  "RESET_PASSWORD_FORM_TWO_SUCCESS";
export const RESET_PASSWORD_FORM_TWO_FAILED: "RESET_PASSWORD_FORM_TWO_FAILED" =
  "RESET_PASSWORD_FORM_TWO_FAILED";

export const register = () => async (dispatch: any, getState: any) => {
  dispatch({ type: REGISTER_REQUEST });
  const data = await request<TAuthorizationResonse>(ENDPOINT.register, {
    ...optionsUnAuth,
    method: "POST",
    body: JSON.stringify(getState().register.form),
  })
    .then((data) => {
      dispatch({ type: REGISTER_SUCCESS });
      return data;
    })
    .catch((err) => handleError(REGISTER_FAILED, err, dispatch));

  if (data && data.success) {
    dispatch(updateUser(data.user));
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }
};

export const login = () => async (dispatch: any, getState: any) => {
  dispatch({ type: LOGIN_REQUEST });
  const data = await request<TAuthorizationResonse>(ENDPOINT.login, {
    ...optionsUnAuth,
    method: "POST",
    body: JSON.stringify(getState().login.form),
  })
    .then((data) => {
      dispatch({ type: LOGIN_SUCCESS });
      return data;
    })
    .catch((err) => handleError(LOGIN_FAILED, err, dispatch));
  if (data && data.success) {
    const value = getState().login.form.password;
    dispatch(updateUser({ ...data.user, password: value }));
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }
};

export const resetPasswordStepOne = () => (dispatch: any, getState: any) => {
  dispatch({ type: RESET_PASSWORD_FORM_ONE_REQUEST });
  request(ENDPOINT.resetPasswordStepOne, {
    ...optionsUnAuth,
    method: "POST",
    body: JSON.stringify(getState().resetForm.form),
  })
    .then(() => {
      dispatch({ type: RESET_PASSWORD_FORM_ONE_SUCCESS });
    })
    .catch((err) => handleError(RESET_PASSWORD_FORM_ONE_FAILED, err, dispatch));
};

export const resetPasswordStepTwo = () => (dispatch: any, getState: any) => {
  dispatch({ type: RESET_PASSWORD_FORM_TWO_REQUEST });
  request<IResetPasswordResponse>(ENDPOINT.resetPasswordStepTwo, {
    ...optionsUnAuth,
    method: "POST",
    body: JSON.stringify(getState().resetFormTwo.form),
  })
    .then(() => {
      dispatch({ type: RESET_PASSWORD_FORM_TWO_SUCCESS });
    })
    .catch((err) => handleError(RESET_PASSWORD_FORM_TWO_FAILED, err, dispatch));
};

export const logout = () => (dispatch: any) => {
  dispatch({ type: LOGOUT_REQUEST });
  if (localStorage.getItem("accessToken")) {
    request<IResetPasswordResponse>(ENDPOINT.logout, {
      ...optionsWithAuth,
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    })
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch({ type: DELETE_USER });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({ type: CLEAR_PROFILE_FORM });
      })
      .catch((err) => handleError(LOGOUT_FAILED, err, dispatch));
  } else throw Error("В хранилище нет токена");
};
