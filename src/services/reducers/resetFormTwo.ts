import { RESET_FORM_TWO_SET_VALUE } from "../actions/authForms";
import {
  RESET_FORM_TWO_SUCCESS,
  RESET_FORM_TWO_FAILED,
  RESET_FORM_TWO_REQUEST,
} from "../actions/auth";

export interface ResetFormTwoState {
  form: { password: string; token: string };
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
}

const initialState: ResetFormTwoState = {
  form: {
    password: "",
    token: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

type TResetFormRequestAction = {
  type: typeof RESET_FORM_TWO_REQUEST;
};

type TResetFormSuccessAction = {
  type: typeof RESET_FORM_TWO_SUCCESS;
};

type TResetFormFailedAction = {
  type: typeof RESET_FORM_TWO_FAILED;
};

type TSetValueAction = {
  type: typeof RESET_FORM_TWO_SET_VALUE;
  field: string;
  value: string;
};

type TResetFormTwoActions =
  | TResetFormRequestAction
  | TResetFormSuccessAction
  | TResetFormFailedAction
  | TSetValueAction;

export const resetFormTwoReducer = (
  state = initialState,
  action: TResetFormTwoActions
) => {
  switch (action.type) {
    case RESET_FORM_TWO_SET_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }

    case RESET_FORM_TWO_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_FORM_TWO_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        resetPasswordRequest: false,
      };
    }
    case RESET_FORM_TWO_FAILED: {
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
