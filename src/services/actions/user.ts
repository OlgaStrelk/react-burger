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

export const updateUser = (user: TUser): TUpdateUserAction => ({
  type: UPDATE_USER_DATA,
  payload: user,
});

export const setAuthChecked = (isChecked: boolean): TSetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: isChecked,
});

export const receiveUser = (user: TUser): TUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const fetchUser = () => async (dispatch: AppDispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  await fetchWithRefresh<IUserSuccessResponse>(ENDPOINT.user, {
    ...optionsWithAuth,
    method: "GET",
  })
    .then((data) => {
      if (data && data.success) {
        dispatch(receiveUser(data.user));
      }
    })
    .catch((err) => {
      dispatch({ type: GET_USER_FAILED });
      handleError(err);
    });
};

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      try {
        dispatch(fetchUser());
      } catch (err) {
        console.log(err);
        dispatch({ type: DELETE_USER });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        dispatch(setAuthChecked(true));
      }
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const editProfile =
  () => async (dispatch: AppDispatch, getState: any) => {
    dispatch({ type: EDIT_PROFILE_REQUEST });
    let form: TUserWithPassword = getState().profile.form;
    const { name, email, password }: TUserWithPassword = form;
    let requestData: TUserWithPassword | TUser =
      password === passwordStub ? { name, email } : { name, email, password };
    await fetchWithRefresh<IUserSuccessResponse>(ENDPOINT.user, {
      ...optionsWithAuth,
      method: "PATCH",
      body: JSON.stringify(requestData),
    })
      .then((data) => {
        if (data && data.success) {
          dispatch({ type: EDIT_PROFILE_SUCCESS });

          dispatch(updateUser(data.user));
        }
      })
      .catch((err) => {
        dispatch({ type: EDIT_PROFILE_FAILED });
        handleError(err);
      });
  };
