import { describe, expect, it } from "vitest";
import {
  logoutReducer as reducer,
  logoutInitialState as initialState,
} from "./logout";
import { TLogoutActions } from "../actions/logout";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../constants/auth";

describe("logout reducer", () => {
  it("should return the initial state", () => {
    const resultingState = reducer(undefined, {} as TLogoutActions);
    expect(resultingState).toEqual(initialState);
  });

  it("should handle LOGOUT_REQUEST", () => {
    const action: TLogoutActions = {
      type: LOGOUT_REQUEST,
    };
    const expectedState = {
      logoutRequest: true,
      logoutFailed: false,
    };
    const resultingState = reducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it("should handle LOGOUT_SUCCESS", () => {
    const action: TLogoutActions = {
      type: LOGOUT_SUCCESS,
    };
    const expectedState = {
      ...initialState,
      logoutRequest: false,
    };
    const resultingState = reducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it("should handle LOGOUT_FAILED", () => {
    const action: TLogoutActions = {
      type: LOGOUT_FAILED,
    };
    const expectedState = {
      logoutFailed: true,
      logoutRequest: false,
    };
    const resultingState = reducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });
});
