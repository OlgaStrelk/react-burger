import { describe, expect, it } from 'vitest';
import { editProfileFormReducer as reducer, editProfileFormInitialState as initialState, ProfileState } from './profile-form';
import { TEditProfileActions } from '../actions/profile-form';
import {
  CLEAR_PROFILE_FORM,
  EDIT_PROFILE_SET_VALUE,
} from '../constants/auth-forms';
import {
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
} from '../constants/user';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as TEditProfileActions)).toEqual(initialState);
  });

  it('should handle EDIT_PROFILE_SET_VALUE', () => {
    const action: TEditProfileActions = {
      type: EDIT_PROFILE_SET_VALUE,
      field: 'name',
      value: 'Test User',
    };
    const expectedState: ProfileState = {
      ...initialState,
      form: {
        ...initialState.form,
        name: 'Test User',
      },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_PROFILE_FORM', () => {
    const action: TEditProfileActions = {
      type: CLEAR_PROFILE_FORM,
    };
    const expectedState: ProfileState = {
      ...initialState,
      form: {
        name: '',
        email: '',
        password: initialState.form.password, // Leave password stub untouched
      },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle EDIT_PROFILE_REQUEST', () => {
    const action: TEditProfileActions = {
      type: EDIT_PROFILE_REQUEST,
    };
    const expectedState: ProfileState = {
      ...initialState,
      editProfileRequest: true,
      editProfileFailed: false,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle EDIT_PROFILE_SUCCESS', () => {
    const action: TEditProfileActions = {
      type: EDIT_PROFILE_SUCCESS,
    };
    const expectedState: ProfileState = {
      ...initialState,
      editProfileRequest: false,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle EDIT_PROFILE_FAILED', () => {
    const action: TEditProfileActions = {
      type: EDIT_PROFILE_FAILED,
    };
    const expectedState: ProfileState = {
      ...initialState,
      editProfileRequest: false,
      editProfileFailed: true,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});