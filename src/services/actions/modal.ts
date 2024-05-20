import { request, handleError } from "../../utils/api";
import { ENDPOINT, optionsWithAuth } from "../../utils/consts";
import { TOrderRequest, IOrderResponse } from "../../utils/types";
import { GET_MODAL_INGREDIENT, RESET_MODAL_INGREDIENT } from "../constants/ingredients";
import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED } from "../constants/order";

export type TGetModalIngredientAction = {
    readonly type: typeof GET_MODAL_INGREDIENT;
    readonly payload: string;
  };
  
  export type TResetModalIngredientAction = {
    readonly type: typeof RESET_MODAL_INGREDIENT;
  };
  
  export type TModalActions =
    | TGetModalIngredientAction
    | TResetModalIngredientAction;
  
  export const getModalIngredient = (id: string): TGetModalIngredientAction => {
    return { type: GET_MODAL_INGREDIENT, payload: id };
  };
  
export const makeOrder = (data: TOrderRequest) => (dispatch: any) => {
    dispatch({ type: MAKE_ORDER_REQUEST });
    request<IOrderResponse>(ENDPOINT.orders, {
      ...optionsWithAuth,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) =>
        dispatch({ type: MAKE_ORDER_SUCCESS, payload: res.order.number })
      )
      .catch((err) => handleError(MAKE_ORDER_FAILED, err, dispatch));
  };
  