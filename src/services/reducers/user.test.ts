import { describe, expect, it } from 'vitest';
import { userReducer, userInitialState as initialState, UserState } from './user';
import { TUserActions } from '../actions/user';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  DELETE_USER,
  SET_AUTH_CHECKED,
  UPDATE_USER_DATA,
} from '../constants/user';

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState);
  });

  it('should handle GET_USER_REQUEST', () => {
    const action: TUserActions = {
      type: GET_USER_REQUEST,
    };
    const expectedState: UserState = {
      ...initialState,
      userRequest: true,
      userFailed: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_USER_SUCCESS', () => {
    const action: TUserActions = {
      type: GET_USER_SUCCESS,
      payload: { name: 'Test User', email: 'test@example.com' },
    };
    const expectedState: UserState = {
      ...initialState,
      user: { name: 'Test User', email: 'test@example.com' },
      userRequest: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_USER_FAILED', () => {
    const action: TUserActions = {
      type: GET_USER_FAILED,
    };
    const expectedState: UserState = {
      ...initialState,
      userFailed: true,
      userRequest: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_USER', () => {
    const action: TUserActions = {
      type: DELETE_USER,
    };
    const expectedState: UserState = {
      ...initialState,
      user: null,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_AUTH_CHECKED', () => {
    const action: TUserActions = {
      type: SET_AUTH_CHECKED,
      payload: true,
    };
    const expectedState: UserState = {
      ...initialState,
      isAuthChecked: true,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_USER_DATA', () => {
    const action: TUserActions = {
      type: UPDATE_USER_DATA,
      payload: { name: 'Updated Name', email: 'updated@example.com' },
    };
    const expectedState: UserState = {
      ...initialState,
      user: { name: 'Updated Name', email: 'updated@example.com' },
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
