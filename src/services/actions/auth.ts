import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth, optionsWithAuth } from "../../utils/consts";
import {
  TAuthorizationResonse,
  IResetPasswordResponse,
} from "../../utils/types";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../constants/auth";
import { CLEAR_PROFILE_FORM } from "../constants/auth-forms";
import { DELETE_USER } from "../constants/user";
import { updateUser } from "./user";

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
