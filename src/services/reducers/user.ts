// import { TUser } from "../../utils/types";
import { TUserActions } from "../actions/user";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  DELETE_USER,
  SET_AUTH_CHECKED,
  UPDATE_USER_DATA,
} from "../constants/user";
export type TUser = { name: string; email: string };

export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  userRequest: boolean;
  userFailed: boolean;
}

export const userInitialState: UserState = {
  user: null,
  isAuthChecked: false,
  userRequest: false,
  userFailed: false,
};

export const userReducer = (
  state = userInitialState,
  action: TUserActions
): UserState => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: { ...action.payload },
        userRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }

    case DELETE_USER: {
      return {
        ...state,
        user: null,
      };
    }

    case SET_AUTH_CHECKED: {
      return { ...state, isAuthChecked: action.payload };
    }

    case UPDATE_USER_DATA: {
      return { ...state, user: { ...action.payload } };
    }

    default: {
      return state;
    }
  }
};
