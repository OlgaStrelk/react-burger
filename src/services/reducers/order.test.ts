import { describe, expect, it } from 'vitest';
import { orderReducer as reducer, orderInitialState as initialState, OrderState } from './order';
import { TOrderActions } from '../actions/order';
import {
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  COUNT_TOTAL,
} from '../constants/order';
import { TIngredient, TOrder, TWsOrder } from '../../utils/types';
import { mockFetchedIngredient } from '../../__test__/__mocks__/ingredients';

describe('orderReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as TOrderActions)).toEqual(initialState);
  });

  it('should handle GET_ORDER_REQUEST', () => {
    const action: TOrderActions = {
      type: GET_ORDER_REQUEST,
    };
    const expectedState: OrderState = {
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    const mockWsOrder: TWsOrder = {
      ingredients: ['bun', 'main', 'sauce'],
      _id: 'mockId',
      owner: 'mockOwner',
      status: 'done',
      name: 'mockName',
      createdAt: '2023-10-26T12:00:00.000Z',
      updatedAt: '2023-10-26T12:00:00.000Z',
      number: 12345,
    };
    const mockIngredients: TIngredient[] = [
      { _id: '1', name: 'Bun', type: 'bun', quantity: 1, ...mockFetchedIngredient },
      { _id: '2', name: 'Main', type: 'main', quantity: 1, ...mockFetchedIngredient },
      { _id: '3', name: 'Sauce', type: 'sauce', quantity: 1, ...mockFetchedIngredient },
    ];
    const mockOrder: TOrder = {
      ...mockWsOrder,
      ingredients: mockIngredients,
    };
    const action: TOrderActions = {
      type: GET_ORDER_SUCCESS,
      payload: mockOrder,
    };
    const expectedState: OrderState = {
      ...initialState,
      order: mockOrder,
      orderRequest: false,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_FAILED', () => {
    const action: TOrderActions = {
      type: GET_ORDER_FAILED,
    };
    const expectedState: OrderState = {
      ...initialState,
      orderFailed: true,
      orderRequest: false,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle COUNT_TOTAL', () => {
    const action: TOrderActions = {
      type: COUNT_TOTAL,
      payload: 500,
    };
    const expectedState: OrderState = {
      ...initialState,
      total: 500,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
