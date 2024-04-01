import { ENDPOINT, request } from "../../utils/consts";

export const SET_USER_DATA = "SET_USER_DATA";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const setUserData = (user) => ({ type: SET_USER_DATA, payload: user });

export const setAuthChecked = (isChecked) => ({
  type: SET_AUTH_CHECKED,
  payload: isChecked,
});

export const getUser = () => {
  return (dispatch) => {
    return request(ENDPOINT.user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((data) => {
        dispatch(setUser(data.user));
      })
      .catch((err) => console.log(err));
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const setUser = (data) => {
  return (dispatch) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    dispatch(setUserData(data.user));
  };
};
