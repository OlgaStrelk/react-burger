import { expect, test, describe } from "vitest";

import {
  loginReducer as reducer,
  loginInitialState as initialState,
} from "./login";
import { TLoginActions } from "../actions/login";
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/auth";
import { LOGIN_SET_VALUE } from "../constants/auth-forms";

describe("login reducer", () => {
  test("should return the initial state", () => {
    // Проверка на возврат initialState при пустом action
    const resultingState = reducer(undefined, {} as TLoginActions);
    expect(resultingState).toEqual(initialState);
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
    const resultingState = reducer(initialState, action);
    expect(resultingState).toEqual(expectedState);
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
    const resultingState = reducer(initialState, action);
    expect(resultingState).toEqual(expectedState);
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
    const resultingState = reducer(initialState, action);
    expect(resultingState).toEqual(expectedState);
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
    const resultingState = reducer(initialState, action);
    expect(resultingState).toEqual(expectedState);
  });
});
