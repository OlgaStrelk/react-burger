import { ENDPOINT, handleError } from "../../utils/consts";
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
  // name,
  // value,
});

export const setAuthChecked = (isChecked: boolean) => ({
  type: SET_AUTH_CHECKED,
  payload: isChecked,
});

//@ts-ignore
export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  let data = await fetchWithRefresh(ENDPOINT.user, {
    ...optionsWithAuth,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") as string,
    },
  })
    // .then((data: any) => {
    //   if (data.success) {
    //     dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    //     console.log("getUser", data);
    //     //@ts-ignore
    //     // dispatch(updateUser(data.user));
    //   }
    // })
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      handleError(GET_USER_FAILED, err, dispatch);
    });
  console.log(data);
  if (data & data.success) {
    dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    //     console.log("getUser", data);
    //     //@ts-ignore
    //     // dispatch(updateUser(data.user));
  }
};

export const checkUserAuth = () => {
  //@ts-ignore
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
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
  console.log("form", getState().profile.form);
  dispatch({ type: EDIT_PROFILE_SUBMIT_REQUEST });
  fetchWithRefresh(ENDPOINT.user, {
    ...optionsWithAuth,
    method: "PATCH",
    body: JSON.stringify(getState().profile.form),
  })
    .then((res) => {
      dispatch({ type: EDIT_PROFILE_SUBMIT_SUCCESS });
      console.log("editProfile", res);
      dispatch(updateUser(res.user));
    })
    .catch((err) => handleError(EDIT_PROFILE_SUBMIT_FAILED, err, dispatch));
};
