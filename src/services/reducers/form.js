import { RESET_FORM_SET_VALUE } from "../actions/user";

const initialState = {
  form: {
    name: "",
    email: "",
    password: "",
    code: false,
  },
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FORM_SET_VALUE: {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
