import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_AUTH_CHECKED,
  UPDATE_USER_DATA,
  DELETE_USER,
} from "../actions/user";
const initialState = {
  // user: { name: "", login: "", password: "" },
  user: null,
  isAuthChecked: false,
  userRequest: false,
  userFailed: false,
};

export const userReducer = (state = initialState, action) => {
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
        user: action.payload,
        userRequest: false,
      };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }

    case DELETE_USER: {
      return {
        ...state,
        user: { ...state.user.initialState },
      };
    }

    case SET_AUTH_CHECKED: {
      return { ...state, isAuthChecked: action.payload };
    }

    case UPDATE_USER_DATA: {
      return { ...state, user: { ...state.user, [action.name]: action.value } };
    }

    default: {
      return state;
    }
  }
};
