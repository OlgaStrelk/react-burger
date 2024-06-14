import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsUnAuth } from "../../utils/consts";
import {
  IIngredientsResponse,
  TConstructorIngredient,
  TFetchedIngredient,
} from "../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  DECREASE_INGREDIENT_QUANTITY,
  INCREASE_INGREDIENT_QUANTITY,
  RESET_INGREDIENTS_QUANTITY,
} from "../constants/ingredients";
import { AppThunk } from "../types";

type TGetIngredientRequestAction = {
  type: typeof GET_INGREDIENTS_REQUEST;
};

type TGetIngredientSuccessAction = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: TFetchedIngredient[];
};

type TGetIngredientFailedAction = {
  type: typeof GET_INGREDIENTS_FAILED;
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

export const receiveIngredients = (
  ingredients: TFetchedIngredient[]
): TGetIngredientSuccessAction => {
  return { type: GET_INGREDIENTS_SUCCESS, payload: ingredients };
};

export const fetchIngredients = (): AppThunk => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  request<IIngredientsResponse>(ENDPOINT.ingredients, {
    ...optionsUnAuth,
    method: "GET",
  })
    .then((res) => {
      dispatch(receiveIngredients(res.data));
    })
    .catch((err) => {
      handleError(err);
      dispatch({ type: GET_INGREDIENTS_FAILED });
    });
};