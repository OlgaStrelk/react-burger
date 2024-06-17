import { describe, expect, it } from "vitest";
import {
  orderMadeReducer as reducer,
  orderMadeInitialState as initialState,
  OrderState,
} from "./order-made";
import { TOrderActions } from "../actions/order";
import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
} from "../constants/order";

describe("orderMadeReducer", () => {
  it("should return the initial state", () => {
    const resultingState = reducer(undefined, {} as TOrderActions);
    expect(resultingState).toEqual(initialState);
  });

  it("should handle MAKE_ORDER_REQUEST", () => {
    const action: TOrderActions = {
      type: MAKE_ORDER_REQUEST,
    };
    const expectedState: OrderState = {
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    };
    const resultingState = reducer(initialState, action);
    expect(resultingState).toEqual(expectedState);
  });

  it("should handle MAKE_ORDER_SUCCESS", () => {
    const mockOrderNumber = 12345;
    const action: TOrderActions = {
      type: MAKE_ORDER_SUCCESS,
      payload: mockOrderNumber,
    };
    const expectedState: OrderState = {
      ...initialState,
      order: mockOrderNumber,
      orderRequest: false,
    };
    const resultingState = reducer(initialState, action);
    expect(resultingState).toEqual(expectedState);
  });

  it("should handle MAKE_ORDER_FAILED", () => {
    const action: TOrderActions = {
      type: MAKE_ORDER_FAILED,
    };
    const expectedState: OrderState = {
      ...initialState,
      orderFailed: true,
      orderRequest: false,
    };
    const resultingState = reducer(initialState, action);
    expect(resultingState).toEqual(expectedState);
  });
});
