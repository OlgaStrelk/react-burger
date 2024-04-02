import { updateUser } from "./user";
import { request } from "../../utils/consts";
import { ENDPOINT } from "../../utils/consts";
import { fetchWithRefresh } from "../../utils/api";
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
  if (data && data.success) {
    dispatch(updateUser(data.user));
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }
};

export const login = () => async (dispatch, getState) => {
  dispatch({ type: LOGIN_SUBMIT_REQUEST });
  const data = await request(ENDPOINT.login, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(getState().login.form),
  })
    .then((data) => {
      const value = getState().login.form.password;
      dispatch(updateUser("password", value));
      dispatch({ type: LOGIN_SUBMIT_SUCCESS });
      return data;
    })
    .catch((err) => {
      console.log(err);

      dispatch({ type: LOGIN_SUBMIT_FAILED });
    });
  if (data && data.success) {
    for (let [key, value] of Object.entries(data.user)) {
      dispatch(updateUser(key, value));
    }
    dispatch(updateUser(data.user));
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }
};

export const resetPasswordStepOne = () => (dispatch, getState) => {
  dispatch({ type: RESET_FORM_ONE_SUBMIT_REQUEST });
  request(ENDPOINT.resetPasswordStepOne, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
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
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(getState().resetFormTwo.form),
  })
    .then((res) => {
      dispatch({ type: RESET_FORM_TWO_SUBMIT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: RESET_FORM_TWO_SUBMIT_FAILED }));
};

