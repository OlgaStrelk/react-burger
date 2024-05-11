import { ENDPOINT, IUserSuccessRequest, handleError } from "../../utils/consts";
import { fetchWithRefresh } from "../../utils/api";
import { optionsWithAuth } from "../../utils/consts";
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

export const getUser = (data: IUserSuccessRequest) => ({
  type: GET_USER_SUCCESS,
  payload: data.user,
});

//@ts-ignore
export const fetchUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  await fetchWithRefresh(ENDPOINT.user, {
    ...optionsWithAuth,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") as string,
    },
  })
    .then(
      (data: { success: boolean; user: { email: string; nale: string } }) => {
        if (data.success) {
          dispatch({ type: GET_USER_SUCCESS, payload: data.user });
        }
      }
    )
    .catch((err) => {
      handleError(GET_USER_FAILED, err, dispatch);
    });
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
export const editProfile = () => (dispatch, getState) => {
  dispatch({ type: EDIT_PROFILE_SUBMIT_REQUEST });
  fetchWithRefresh(ENDPOINT.user, {
    ...optionsWithAuth,
    method: "PATCH",
    body: JSON.stringify(getState().profile.form),
  })
    .then((res) => {
      dispatch({ type: EDIT_PROFILE_SUBMIT_SUCCESS });
      dispatch(updateUser(res.user));
    })
    .catch((err) => handleError(EDIT_PROFILE_SUBMIT_FAILED, err, dispatch));
};
