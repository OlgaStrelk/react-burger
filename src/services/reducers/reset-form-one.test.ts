import { describe, expect, it } from 'vitest';
import { resetFormReducer, ResetFormOneInitialState as initialState, ResetFormState } from './reset-form-one';
import { TResetFormActions } from '../actions/reset-form-one';
import {
  RESET_PASSWORD_FORM_ONE_REQUEST,
  RESET_PASSWORD_FORM_ONE_SUCCESS,
  RESET_PASSWORD_FORM_ONE_FAILED,
} from '../constants/auth';
import { RESET_PASSWORD_FORM_ONE_SET_VALUE } from '../constants/auth-forms';

describe('resetFormReducer', () => {
  it('should return the initial state', () => {
    expect(resetFormReducer(undefined, {} as TResetFormActions)).toEqual(initialState);
  });

  it('should handle RESET_PASSWORD_FORM_ONE_SET_VALUE', () => {
    const action: TResetFormActions = {
      type: RESET_PASSWORD_FORM_ONE_SET_VALUE,
      field: 'email',
      value: 'test@example.com',
    };
    const expectedState: ResetFormState = {
      ...initialState,
      form: {
        ...initialState.form,
        email: 'test@example.com',
      },
    };
    expect(resetFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_FORM_ONE_REQUEST', () => {
    const action: TResetFormActions = {
      type: RESET_PASSWORD_FORM_ONE_REQUEST,
    };
    const expectedState: ResetFormState = {
      ...initialState,
      resetPasswordRequest: true,
      resetPasswordFailed: false,
    };
    expect(resetFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_FORM_ONE_SUCCESS', () => {
    const action: TResetFormActions = {
      type: RESET_PASSWORD_FORM_ONE_SUCCESS,
    };
    const expectedState: ResetFormState = {
      ...initialState,
      form: {
        ...initialState.form,
      },
      resetPasswordRequest: false,
    };
    expect(resetFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_FORM_ONE_FAILED', () => {
    const action: TResetFormActions = {
      type: RESET_PASSWORD_FORM_ONE_FAILED,
    };
    const expectedState: ResetFormState = {
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFailed: true,
    };
    expect(resetFormReducer(initialState, action)).toEqual(expectedState);
  });
});
