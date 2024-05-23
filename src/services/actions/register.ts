import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth } from "../../utils/consts";
import { TAuthorizationResonse } from "../../utils/types";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED } from "../constants/auth";
import { REGISTER_SET_VALUE } from "../constants/auth-forms";
import { AppThunk, AppDispatch } from "../types";
import { updateUser } from "./user";



type TRegisterRequestAction = {
  type: typeof REGISTER_REQUEST;
};

type TRegisterSuccessAction = {
  type: typeof REGISTER_SUCCESS;
};

type TRegisterFailedAction = {
  type: typeof REGISTER_FAILED;
};

type TSetValueAction = {
  type: typeof REGISTER_SET_VALUE;
  field: string;
  value: string;
};

export type TRegisterActions =
  | TRegisterRequestAction
  | TRegisterSuccessAction
  | TRegisterFailedAction
  | TSetValueAction;

export const registerFormValue = (field: string, value: string) => ({
  type: REGISTER_SET_VALUE,
  field,
  value,
});

export const register:AppThunk = () => async (dispatch: AppDispatch, getState: any) => {
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