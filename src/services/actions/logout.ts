import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsWithAuth } from "../../utils/consts";
import { IResetPasswordResponse } from "../../utils/types";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../constants/auth";
import { CLEAR_PROFILE_FORM } from "../constants/auth-forms";
import { DELETE_USER } from "../constants/user";
import { AppDispatch, AppThunk } from "../types";

type TLogoutRequestAction = {
  type: typeof LOGOUT_REQUEST;
};

type TLogoutSuccessAction = {
  type: typeof LOGOUT_SUCCESS;
};

type TLogoutFailedAction = {
  type: typeof LOGOUT_FAILED;
};

export type TLogoutActions =
  | TLogoutRequestAction
  | TLogoutSuccessAction
  | TLogoutFailedAction;

export const logout = (): AppThunk => (dispatch) => {
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
      .catch((err) => {
        handleError(err);
        dispatch({ type: LOGOUT_FAILED });
      });
  } else throw Error("В хранилище нет токена");
};
