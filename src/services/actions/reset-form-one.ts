import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth } from "../../utils/consts";
import {
  RESET_PASSWORD_FORM_ONE_REQUEST,
  RESET_PASSWORD_FORM_ONE_SUCCESS,
  RESET_PASSWORD_FORM_ONE_FAILED,
} from "../constants/auth";
import { RESET_PASSWORD_FORM_ONE_SET_VALUE } from "../constants/auth-forms";

export const resetPasswordOneFormValue = (field: string, value: string) => ({
    type: RESET_PASSWORD_FORM_ONE_SET_VALUE,
    field,
    value,
  });

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
