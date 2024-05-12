import { ENDPOINT } from "../../utils/consts";
import { fetchWithRefresh, handleError } from "../../utils/api";
import { optionsWithAuth } from "../../utils/consts";
import { IUserSuccessResponse, TUser } from "../../utils/types";
export const DELETE_USER = "DELETE_USER";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const EDIT_PROFILE_SUBMIT_SUCCESS = "EDIT_PROFILE_SUBMIT_SUCCESS";
export const EDIT_PROFILE_SUBMIT_FAILED = "EDIT_PROFILE_SUBMIT_FAILED";
export const EDIT_PROFILE_SUBMIT_REQUEST = "EDIT_PROFILE_SUBMIT_REQUEST";

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const updateUser = (user: { [key in string]: string }) => ({
  type: UPDATE_USER_DATA,
  payload: user,
});

export const setAuthChecked = (isChecked: boolean) => ({
  type: SET_AUTH_CHECKED,
  payload: isChecked,
});

export const getUser = (user: TUser) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

//@ts-ignore
export const fetchUser = () => async (dispatch) => {
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
    dispatch(getUser(data.user));
  }
};

export const checkUserAuth = () => {
  //@ts-ignore
  return (dispatch) => {
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
//@ts-ignore
export const editProfile = () => async (dispatch, getState) => {
  dispatch({ type: EDIT_PROFILE_SUBMIT_REQUEST });
  let formData = getState().profile.form;
  //поправить - если пароль не изменен, он не должен отправляться
  //{name:form.name, email:form.email}, сделать валидацию формы
  //если форма равна initialState, то пароль не отправляем,если введенный пароль не валиден, возвращаем initialState
  let data = await (<Promise<IUserSuccessResponse>>fetchWithRefresh(
    ENDPOINT.user,
    {
      ...optionsWithAuth,
      method: "PATCH",
      body: JSON.stringify(formData),
    }
  )
    .then((data) => data)
    .catch((err) => handleError(EDIT_PROFILE_SUBMIT_FAILED, err, dispatch)));

  if (data && data.success) {
    dispatch({ type: EDIT_PROFILE_SUBMIT_SUCCESS });

    console.log("ответ сервера", data);
    dispatch(updateUser(data.user));
  }
};
