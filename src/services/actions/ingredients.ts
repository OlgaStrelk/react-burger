import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth } from "../../utils/consts";
import {
  IIngredientsResponse,
  TConstructorIngredient,
  TIngredient,
} from "../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  DECREASE_INGREDIENT_QUANTITY,
  INCREASE_INGREDIENT_QUANTITY,
  RESET_INGREDIENTS_QUANTITY,
} from "../constants/ingredients";
import { AppDispatch, AppThunk } from "../types";

type TGetIngredientRequestAction = {
  type: typeof GET_INGREDIENTS_REQUEST;
};

type TGetIngredientSuccessAction = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: TIngredient[];
};

type TGetIngredientFailedAction = {
  type: typeof GET_INGREDIENTS_FAILED;
  payload: string;
};
type TIncreaseQuantityAction = {
  type: typeof INCREASE_INGREDIENT_QUANTITY;
  payload: TConstructorIngredient;
};
type TDecreaseQuantityAction = {
  type: typeof DECREASE_INGREDIENT_QUANTITY;
  payload: string;
};
type TResetQuantityAction = {
  type: typeof RESET_INGREDIENTS_QUANTITY;
};

export type TIngredientsActions =
  | TGetIngredientRequestAction
  | TGetIngredientSuccessAction
  | TGetIngredientFailedAction
  | TIncreaseQuantityAction
  | TDecreaseQuantityAction
  | TResetQuantityAction;

export const increaseQuantity = (
  ingredient: TConstructorIngredient
): TIncreaseQuantityAction => {
  return { type: INCREASE_INGREDIENT_QUANTITY, payload: ingredient };
};
export const decreaseQuantity = (id: string): TDecreaseQuantityAction => {
  return { type: DECREASE_INGREDIENT_QUANTITY, payload: id };
};

export const fetchIngredients:AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  request<IIngredientsResponse>(ENDPOINT.ingredients, {
    ...optionsUnAuth,
    method: "GET",
  })
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
    })
    .catch((err) => handleError(GET_INGREDIENTS_FAILED, err, dispatch));
};