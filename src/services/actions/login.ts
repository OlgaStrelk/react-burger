import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth } from "../../utils/consts";
import { TAuthorizationResonse } from "../../utils/types";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../constants/auth";
import { LOGIN_SET_VALUE } from "../constants/auth-forms";
import { updateUser } from "./user";

type TLoginRequestAction = {
  type: typeof LOGIN_REQUEST;
};

type TLoginSuccessAction = {
  type: typeof LOGIN_SUCCESS;
};

type TLoginFailedAction = {
  type: typeof LOGIN_FAILED;
};

type TSetValueAction = {
  type: typeof LOGIN_SET_VALUE;
  field: string;
  value: string;
};

export type TLoginActions =
  | TLoginRequestAction
  | TLoginSuccessAction
  | TLoginFailedAction
  | TSetValueAction;


export const loginFormValue = (field: string, value: string) => ({
  type: LOGIN_SET_VALUE,
  field,
  value,
});

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
