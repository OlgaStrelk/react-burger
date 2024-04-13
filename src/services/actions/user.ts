import { ENDPOINT } from "../../utils/consts";
import { fetchWithRefresh } from "../../utils/api";

export const DELETE_USER = "DELETE_USER";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const EDIT_PROFILE_SUBMIT_SUCCESS = "EDIT_PROFILE_SUBMIT_SUCCESS";
export const EDIT_PROFILE_SUBMIT_FAILED = "EDIT_PROFILE_SUBMIT_FAILED";
export const EDIT_PROFILE_SUBMIT_REQUEST = "EDIT_PROFILE_SUBMIT_REQUEST";

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const updateUser = (name, value) => ({
  type: UPDATE_USER_DATA,
  name,
  value,
});

export const setAuthChecked = (isChecked) => ({
  type: SET_AUTH_CHECKED,
  payload: isChecked,
});

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  await fetchWithRefresh(ENDPOINT.user, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  })
    .then((data) => {
      dispatch({ type: GET_USER_SUCCESS });
      for (let [key, value] of Object.entries(data.user)) {
        dispatch(updateUser(key, value));
      }
    })
    .catch((err) => {
      dispatch({ type: GET_USER_FAILED });
    });
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({ type: DELETE_USER });
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const editProfile = () => (dispatch, getState) => {
  dispatch({ type: EDIT_PROFILE_SUBMIT_REQUEST });
  fetchWithRefresh(ENDPOINT.user, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(getState().profile.form),
  })
    .then((res) => {
      dispatch({ type: EDIT_PROFILE_SUBMIT_SUCCESS });
      for (let [key, value] of Object.entries(res.user)) {
        dispatch(updateUser(key, value));
      }
    })
    .catch((err) => dispatch({ type: EDIT_PROFILE_SUBMIT_FAILED }));
};
