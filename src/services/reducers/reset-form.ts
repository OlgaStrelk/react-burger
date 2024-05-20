import { RESET_PASSWORD_FORM_ONE_SET_VALUE } from "../actions/authForms";

import {
  RESET_PASSWORD_FORM_ONE_SUCCESS,
  RESET_PASSWORD_FORM_ONE_FAILED,
  RESET_PASSWORD_FORM_ONE_REQUEST,
} from "../actions/auth";

export interface ResetFormState {
  form: { email: string };
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
}
const initialState: ResetFormState = {
  form: {
    email: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};
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
  
export const resetFormReducer = (
  state = initialState,
  action: TResetFormActions
) => {
  switch (action.type) {
    case RESET_PASSWORD_FORM_ONE_SET_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case RESET_PASSWORD_FORM_ONE_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_PASSWORD_FORM_ONE_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case RESET_PASSWORD_FORM_ONE_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
