import { describe, expect, it } from 'vitest';
import { resetFormTwoReducer, resetFormTwoInitialState as initialState, ResetFormTwoState } from './reset-form-two';
import { TResetFormTwoActions } from '../actions/reset-form-two';
import {
  RESET_PASSWORD_FORM_TWO_REQUEST,
  RESET_PASSWORD_FORM_TWO_SUCCESS,
  RESET_PASSWORD_FORM_TWO_FAILED,
} from '../constants/auth';
import { RESET_PASSWORD_FORM_TWO_SET_VALUE } from '../constants/auth-forms';

describe('resetFormTwoReducer', () => {
  it('should return the initial state', () => {
    expect(resetFormTwoReducer(undefined, {} as TResetFormTwoActions)).toEqual(initialState);
  });

  it('should handle RESET_PASSWORD_FORM_TWO_SET_VALUE', () => {
    const action: TResetFormTwoActions = {
      type: RESET_PASSWORD_FORM_TWO_SET_VALUE,
      field: 'password',
      value: 'testPassword123',
    };
    const expectedState: ResetFormTwoState = {
      ...initialState,
      form: {
        ...initialState.form,
        password: 'testPassword123',
      },
    };
    expect(resetFormTwoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_FORM_TWO_REQUEST', () => {
    const action: TResetFormTwoActions = {
      type: RESET_PASSWORD_FORM_TWO_REQUEST,
    };
    const expectedState: ResetFormTwoState = {
      ...initialState,
      resetPasswordRequest: true,
      resetPasswordFailed: false,
    };
    expect(resetFormTwoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_FORM_TWO_SUCCESS', () => {
    const action: TResetFormTwoActions = {
      type: RESET_PASSWORD_FORM_TWO_SUCCESS,
    };
    const expectedState: ResetFormTwoState = {
      ...initialState,
      form: {
        ...initialState.form,
      },
      resetPasswordRequest: false,
    };
    expect(resetFormTwoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_FORM_TWO_FAILED', () => {
    const action: TResetFormTwoActions = {
      type: RESET_PASSWORD_FORM_TWO_FAILED,
    };
    const expectedState: ResetFormTwoState = {
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFailed: true,
    };
    expect(resetFormTwoReducer(initialState, action)).toEqual(expectedState);
  });
});
