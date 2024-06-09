import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth } from "../../utils/consts";
import {
  RESET_PASSWORD_FORM_ONE_REQUEST,
  RESET_PASSWORD_FORM_ONE_SUCCESS,
  RESET_PASSWORD_FORM_ONE_FAILED,
} from "../constants/auth";
import { RESET_PASSWORD_FORM_ONE_SET_VALUE } from "../constants/auth-forms";
import { AppDispatch, AppThunk } from "../types";

type TResetFormRequestAction = {
  type: typeof RESET_PASSWORD_FORM_ONE_REQUEST;
};

type TResetFormSuccessAction = {
  type: typeof RESET_PASSWORD_FORM_ONE_SUCCESS;
};

type TResetFormFailedAction = {
  type: typeof RESET_PASSWORD_FORM_ONE_FAILED;
};

type TSetValueAction = {
  type: typeof RESET_PASSWORD_FORM_ONE_SET_VALUE;
  field: string;
  value: string;
};

export type TResetFormActions =
  | TResetFormRequestAction
  | TResetFormSuccessAction
  | TResetFormFailedAction
  | TSetValueAction;

export const resetPasswordOneFormValue = (field: string, value: string) => ({
  type: RESET_PASSWORD_FORM_ONE_SET_VALUE,
  field,
  value,
});

export const resetPasswordStepOne =
  ():AppThunk => (dispatch, getState) => {
    dispatch({ type: RESET_PASSWORD_FORM_ONE_REQUEST });
    request(ENDPOINT.resetPasswordStepOne, {
      ...optionsUnAuth,
      method: "POST",
      body: JSON.stringify(getState().resetForm.form),
    })
      .then(() => {
        dispatch({ type: RESET_PASSWORD_FORM_ONE_SUCCESS });
      })
      .catch((err) => {
        handleError(err);
        dispatch({ type: RESET_PASSWORD_FORM_ONE_FAILED });
      });
  };
