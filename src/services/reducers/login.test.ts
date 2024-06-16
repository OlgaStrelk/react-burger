import { expect, test, describe } from "vitest";

import { loginReducer, loginInitialState as initialState } from "./login";
import { TLoginActions } from "../actions/login";
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/auth";
import { LOGIN_SET_VALUE } from "../constants/auth-forms";

describe("login reducer", () => {
  test("should return the initial state", () => {
    // Проверка на возврат initialState при пустом action
    expect(loginReducer(undefined, {} as TLoginActions)).toEqual(initialState);
  });

  test("should handle LOGIN_SET_VALUE", () => {
    // Проверка установки значения в форму
    const action: TLoginActions = {
      type: LOGIN_SET_VALUE,
      field: "email",
      value: "test@example.com",
    };
    const expectedState = {
      ...initialState,
      form: {
        ...initialState.form,
        email: "test@example.com",
      },
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle LOGIN_REQUEST", () => {
    // Проверка начала запроса логина
    const action: TLoginActions = {
      type: LOGIN_REQUEST,
    };
    const expectedState = {
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle LOGIN_SUCCESS", () => {
    // Проверка успешного логина
    const action: TLoginActions = {
      type: LOGIN_SUCCESS,
    };
    const expectedState = {
      ...initialState,
      form: {
        ...initialState.form,
      },
      loginRequest: false,
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle LOGIN_FAILED", () => {
    // Проверка неудачного логина
    const action: TLoginActions = {
      type: LOGIN_FAILED,
    };
    const expectedState = {
      ...initialState,
      loginRequest: false,
      loginFailed: true,
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });
});
