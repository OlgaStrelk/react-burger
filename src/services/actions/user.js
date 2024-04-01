import { ENDPOINT } from "../../utils/consts";
import { fetchWithRefresh } from "../../utils/api";

export const DELETE_USER = "DELETE_USER";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
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
      dispatch({ type: GET_USER_FAILURE });
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
