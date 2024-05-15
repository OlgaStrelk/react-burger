import { LOGOUT_REQUEST, LOGOUT_FAILED, LOGOUT_SUCCESS } from "../actions/auth";
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

type TLogoutActions =
  | TLogoutRequestAction
  | TLogoutSuccessAction
  | TLogoutFailedAction;

export const userReducer = (state = initialState, action: TLogoutActions) => {
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