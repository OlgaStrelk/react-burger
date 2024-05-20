import { handleError, request } from "../../utils/api";
import { ENDPOINT, optionsUnAuth } from "../../utils/consts";
import { IResetPasswordResponse } from "../../utils/types";
import { RESET_PASSWORD_FORM_TWO_REQUEST, RESET_PASSWORD_FORM_TWO_SUCCESS, RESET_PASSWORD_FORM_TWO_FAILED } from "../constants/auth";
import { RESET_PASSWORD_FORM_TWO_SET_VALUE } from "../constants/auth-forms";

type TResetFormRequestAction = {
  type: typeof RESET_PASSWORD_FORM_TWO_REQUEST;
};

type TResetFormSuccessAction = {
  type: typeof RESET_PASSWORD_FORM_TWO_SUCCESS;
};

type TResetFormFailedAction = {
  type: typeof RESET_PASSWORD_FORM_TWO_FAILED;
};

type TSetValueAction = {
  type: typeof RESET_PASSWORD_FORM_TWO_SET_VALUE;
  field: string;
  value: string;
};

export type TResetFormTwoActions =
  | TResetFormRequestAction
  | TResetFormSuccessAction
  | TResetFormFailedAction
  | TSetValueAction;


export const resetPasswordTwoFormValue = (field: string, value: string) => ({
    type: RESET_PASSWORD_FORM_TWO_SET_VALUE,
    field,
    value,
  });

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
