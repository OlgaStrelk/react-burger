import { TBurgerConstructorActions } from "../actions/constructor-ingredients";
import { TIngredientsActions } from "../actions/ingredients";
import { TLoginActions } from "../actions/login";
import { TLogoutActions } from "../actions/logout";
import { TOrderActions } from "../actions/order";
import { TEditProfileActions } from "../actions/profile-form";
import { TRegisterActions } from "../actions/register";
import { TResetFormActions } from "../actions/reset-form-one";
import { TResetFormTwoActions } from "../actions/reset-form-two";
import { TUserActions } from "../actions/user";

export type TAppActions =
  | TBurgerConstructorActions
  | TIngredientsActions
  | TLoginActions
  | TLogoutActions
  | TOrderActions
  | TEditProfileActions
  | TRegisterActions
  | TResetFormActions
  | TResetFormTwoActions
  | TUserActions;