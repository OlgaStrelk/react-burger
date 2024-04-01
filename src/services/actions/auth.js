import { setUserData } from "./user";
import { request } from "../../utils/consts";
import { ENDPOINT } from "../../utils/consts";
export const REGISTER_SUBMIT_REQUEST = "REGISTER_SUBMIT_REQUEST";
export const REGISTER_SUBMIT_SUCCESS = "REGISTER_SUBMIT_SUCCESS";
export const REGISTER_SUBMIT_FAILED = "REGISTER_SUBMIT_FAILED";

export const LOGIN_SUBMIT_SUCCESS = "LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_FAILED = "LOGIN_SUBMIT_FAILED";
export const LOGIN_SUBMIT_REQUEST = "LOGIN_SUBMIT_REQUEST";

export const register = () => async (dispatch, getState) => {
  dispatch({ type: REGISTER_SUBMIT_REQUEST });
  const data = await request(ENDPOINT.register, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(getState().register.form),
  })
    .then((data) => {
      dispatch({ type: REGISTER_SUBMIT_SUCCESS });
      return data;
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REGISTER_SUBMIT_FAILED });
    });
  if (data.success) {
    dispatch(setUserData(data.user));
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }
};

export const login = () => async (dispatch, getState) => {
  dispatch({ type: LOGIN_SUBMIT_REQUEST });
  const data = await request(ENDPOINT.login, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getState().login.form),
  })
    .then((data) => {
      dispatch({ type: LOGIN_SUBMIT_SUCCESS });
      return data;
    })
    .catch((err) => {
      console.log(err);

      dispatch({ type: LOGIN_SUBMIT_FAILED });
    });
  if (data.success) {
    dispatch(setUserData(data.user));
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }
};
