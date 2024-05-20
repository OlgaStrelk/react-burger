import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED } from "../constants/auth";
import { REGISTER_SET_VALUE } from "../constants/auth-forms";

type TRegisterRequestAction = {
    type: typeof REGISTER_REQUEST;
  };
  
  type TRegisterSuccessAction = {
    type: typeof REGISTER_SUCCESS;
  };
  
  type TRegisterFailedAction = {
    type: typeof REGISTER_FAILED;
  };
  
  type TSetValueAction = {
    type: typeof REGISTER_SET_VALUE;
    field: string;
    value: string;
  };
  
  export type TRegisterActions =
    | TRegisterRequestAction
    | TRegisterSuccessAction
    | TRegisterFailedAction
    | TSetValueAction;
  