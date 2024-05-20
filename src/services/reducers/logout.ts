import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED } from "../constants/auth";

export interface UserState {
  logoutRequest: boolean;
  logoutFailed: boolean;
}

const initialState: { logoutRequest: boolean; logoutFailed: boolean } = {
  logoutRequest: false,
  logoutFailed: false,
};

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

export const logoutReducer = (state = initialState, action: TLogoutActions) => {
  switch (action.type) {
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};
