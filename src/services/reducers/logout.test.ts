import { describe, expect, it } from "vitest";
import { logoutReducer, logoutInitialState as initialState } from "./logout";
import { TLogoutActions } from "../actions/logout";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../constants/auth";

describe("logout reducer", () => {
  it("should return the initial state", () => {
    expect(logoutReducer(undefined, {} as TLogoutActions)).toEqual(
      initialState
    );
  });

  it("should handle LOGOUT_REQUEST", () => {
    const action: TLogoutActions = {
      type: LOGOUT_REQUEST,
    };
    const expectedState = {
      logoutRequest: true,
      logoutFailed: false,
    };
    const result = logoutReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it("should handle LOGOUT_SUCCESS", () => {
    const action: TLogoutActions = {
      type: LOGOUT_SUCCESS,
    };
    const expectedState = {
      ...initialState,
      logoutRequest: false,
    };
    const result = logoutReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it("should handle LOGOUT_FAILED", () => {
    const action: TLogoutActions = {
      type: LOGOUT_FAILED,
    };
    const expectedState = {
      logoutFailed: true,
      logoutRequest: false,
    };
    const result = logoutReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });
});
