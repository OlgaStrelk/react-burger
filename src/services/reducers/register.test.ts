import { describe, expect, it } from 'vitest';
import { registerReducer, registerInitialState as initialState, RegisterState } from './register';
import { TRegisterActions } from '../actions/register';
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../constants/auth';
import { REGISTER_SET_VALUE } from '../constants/auth-forms';

describe('registerReducer', () => {
  it('should return the initial state', () => {
    expect(registerReducer(undefined, {} as TRegisterActions)).toEqual(initialState);
  });

  it('should handle REGISTER_SET_VALUE', () => {
    const action: TRegisterActions = {
      type: REGISTER_SET_VALUE,
      field: 'email',
      value: 'test@example.com',
    };
    const expectedState: RegisterState = {
      ...initialState,
      form: {
        ...initialState.form,
        email: 'test@example.com',
      },
    };
    expect(registerReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REGISTER_REQUEST', () => {
    const action: TRegisterActions = {
      type: REGISTER_REQUEST,
    };
    const expectedState: RegisterState = {
      ...initialState,
      resetPasswordRequest: true,
      resetPasswordFailed: false,
    };
    expect(registerReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REGISTER_SUCCESS', () => {
    const action: TRegisterActions = {
      type: REGISTER_SUCCESS,
    };
    const expectedState: RegisterState = {
      ...initialState,
      form: {
        ...initialState.form,
      },
      resetPasswordRequest: false,
    };
    expect(registerReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REGISTER_FAILED', () => {
    const action: TRegisterActions = {
      type: REGISTER_FAILED,
    };
    const expectedState: RegisterState = {
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFailed: true,
    };
    expect(registerReducer(initialState, action)).toEqual(expectedState);
  });
});
