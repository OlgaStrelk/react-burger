import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SET_AUTH_CHECKED,
  UPDATE_USER_DATA,
  DELETE_USER,
} from "../actions/user";
import { TUser } from "../../utils/types";
export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  userRequest: boolean;
  userFailed: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  userRequest: false,
  userFailed: false,
};

type TUserRequestAction = {
  type: typeof GET_USER_REQUEST;
};

type TUserSuccessAction = {
  type: typeof GET_USER_SUCCESS;
  payload: TUser;
};

type TUserFailedAction = {
  type: typeof GET_USER_FAILED;
};

type TDeleteUserAction = {
  type: typeof DELETE_USER;
};

type TSetAuthCheckedAction = {
  type: typeof SET_AUTH_CHECKED;
  payload: boolean;
};

type TUpdateUserAction = {
  type: typeof UPDATE_USER_DATA;
  payload: { [key in string]: string };
};

type TUserActions =
  | TUserRequestAction
  | TUserSuccessAction
  | TUserFailedAction
  | TDeleteUserAction
  | TSetAuthCheckedAction
  | TUpdateUserAction;

  
export const userReducer = (state = initialState, action: TUserActions) => {
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
