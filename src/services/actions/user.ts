import { ENDPOINT, passwordStub } from "../../utils/consts";
import { fetchWithRefresh, handleError } from "../../utils/api";
import { optionsWithAuth } from "../../utils/consts";
import {
  IUserSuccessResponse,
  TUser,
  TUserWithPassword,
} from "../../utils/types";
import {
  UPDATE_USER_DATA,
  SET_AUTH_CHECKED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  DELETE_USER,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_FAILED,
  EDIT_PROFILE_SUCCESS,
} from "../constants/user";
import { AppDispatch } from "../types";

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
  payload: TUser;
};

export type TUserActions =
  | TUserRequestAction
  | TUserSuccessAction
  | TUserFailedAction
  | TDeleteUserAction
  | TSetAuthCheckedAction
  | TUpdateUserAction;

export const updateUser = (user: TUser):TUpdateUserAction => ({
  type: UPDATE_USER_DATA,
  payload: user,
});

export const setAuthChecked = (isChecked: boolean):TSetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: isChecked,
});

export const receiveUser = (user: TUser):TUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const fetchUser = () => async (dispatch: AppDispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  const data = await (<Promise<IUserSuccessResponse>>fetchWithRefresh(
    ENDPOINT.user,
    {
      ...optionsWithAuth,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken") as string,
      },
    }
  )
    .then((data) => data)
    .catch((err) => {
      handleError(GET_USER_FAILED, err, dispatch);
    }));

  if (data && data.success) {
    dispatch(receiveUser(data.user));
  }
};

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(fetchUser())
        .catch((err: Error) => {
          handleError(DELETE_USER, err, dispatch);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const editProfile =
  () => async (dispatch: AppDispatch, getState: any) => {
    dispatch({ type: EDIT_PROFILE_REQUEST });
    let form = getState().profile.form;
    const { name, email, password }: TUserWithPassword = form;
    let requestData: TUserWithPassword | TUser =
      password === passwordStub ? { name, email } : { name, email, password };
    let data = await (<Promise<IUserSuccessResponse>>fetchWithRefresh(
      ENDPOINT.user,
      {
        ...optionsWithAuth,
        method: "PATCH",
        body: JSON.stringify(requestData),
      }
    )
      .then((data) => data)
      .catch((err) => handleError(EDIT_PROFILE_FAILED, err, dispatch)));

    if (data && data.success) {
      dispatch({ type: EDIT_PROFILE_SUCCESS });

      dispatch(updateUser(data.user));
    }
  };
