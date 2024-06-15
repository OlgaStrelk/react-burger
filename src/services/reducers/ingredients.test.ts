
import { describe, expect, it } from 'vitest';
import { TIngredient } from '../../utils/types';
import {
  ingredientsReducer,
  ingredientsInitialState,
  IngredientsState,
} from './ingredients';
import { TIngredientsActions } from '../actions/ingredients';
import {
  DECREASE_INGREDIENT_QUANTITY,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_QUANTITY,
  RESET_INGREDIENTS_QUANTITY,
} from '../constants/ingredients';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual(
      ingredientsInitialState
    );
  });

  it('should start ingredients request', () => {
    const action: TIngredientsActions = {
      type: GET_INGREDIENTS_REQUEST,
    };
    const expectedState = {
      ...ingredientsInitialState,
      ingredientsRequest: true,
      ingredientsFailed: false,
    };
    expect(ingredientsReducer(ingredientsInitialState, action)).toEqual(
      expectedState
    );
  });

  it('should fetch ingredients', () => {
    const mockIngredients: TIngredient[] = [
      { _id: '1', name: 'Ingredient 1', type: 'bun', quantity: 0 },
      { _id: '2', name: 'Ingredient 2', type: 'sauce', quantity: 0 },
    ];
    const action: TIngredientsActions = {
      type: GET_INGREDIENTS_SUCCESS,
      payload: mockIngredients,
    };
    const expectedState = {
      ...ingredientsInitialState,
      ingredients: mockIngredients,
      ingredientsRequest: false,
    };
    expect(ingredientsReducer(ingredientsInitialState, action)).toEqual(
      expectedState
    );
  });

  it('should fail ingredients request', () => {
    const action: TIngredientsActions = {
      type: GET_INGREDIENTS_FAILED,
    };
    const expectedState = {
      ...ingredientsInitialState,
      ingredientsFailed: true,
      ingredientsRequest: false,
    };
    expect(ingredientsReducer(ingredientsInitialState, action)).toEqual(
      expectedState
    );
  });

  describe('should handle INCREASE_INGREDIENT_QUANTITY', () => {
    const initialStateWithIngredients: IngredientsState = {
      ...ingredientsInitialState,
      ingredients: [
        { _id: '1', name: 'Bun', type: 'bun', quantity: 0 },
        { _id: '2', name: 'Sauce', type: 'sauce', quantity: 0 },
      ],
    };

    it('should increase quantity for a non-bun ingredient', () => {
      const action: TIngredientsActions = {
        type: INCREASE_INGREDIENT_QUANTITY,
        payload: { _id: '2', name: 'Sauce', type: 'sauce', quantity: 1 },
      };
      const expectedState = {
        ...initialStateWithIngredients,
        ingredients: [
          { _id: '1', name: 'Bun', type: 'bun', quantity: 0 },
          { _id: '2', name: 'Sauce', type: 'sauce', quantity: 1 },
        ],
      };
      expect(
        ingredientsReducer(initialStateWithIngredients, action)
      ).toEqual(expectedState);
    });

    it('should set quantity to 2 for a bun ingredient', () => {
      const action: TIngredientsActions = {
        type: INCREASE_INGREDIENT_QUANTITY,
        payload: { _id: '1', name: 'Bun', type: 'bun', quantity: 2 },
      };
      const expectedState = {
        ...initialStateWithIngredients,
        ingredients: [
          { _id: '1', name: 'Bun', type: 'bun', quantity: 2 },
          { _id: '2', name: 'Sauce', type: 'sauce', quantity: 0 },
        ],
      };
      expect(
        ingredientsReducer(initialStateWithIngredients, action)
      ).toEqual(expectedState);
    });
  });

  describe('should handle DECREASE_INGREDIENT_QUANTITY', () => {
    const initialStateWithIngredients: IngredientsState = {
      ...ingredientsInitialState,
      ingredients: [
        { _id: '1', name: 'Bun', type: 'bun', quantity: 2 },
        { _id: '2', name: 'Sauce', type: 'sauce', quantity: 1 },
      ],
    };
    it('should decrease quantity for an ingredient', () => {
      const action: TIngredientsActions = {
        type: DECREASE_INGREDIENT_QUANTITY,
        payload: '2',
      };
      const expectedState = {
        ...initialStateWithIngredients,
        ingredients: [
          { _id: '1', name: 'Bun', type: 'bun', quantity: 2 },
          { _id: '2', name: 'Sauce', type: 'sauce', quantity: 0 },
        ],
      };
      expect(
        ingredientsReducer(initialStateWithIngredients, action)
      ).toEqual(expectedState);
    });
  });

  it('should handle RESET_INGREDIENTS_QUANTITY', () => {
    const initialStateWithIngredients: IngredientsState = {
      ...ingredientsInitialState,
      ingredients: [
        { _id: '1', name: 'Bun', type: 'bun', quantity: 2 },
        { _id: '2', name: 'Sauce', type: 'sauce', quantity: 1 },
      ],
    };
    const action: TIngredientsActions = {
      type: RESET_INGREDIENTS_QUANTITY,
    };
    const expectedState = {
      ...initialStateWithIngredients,
      ingredients: [
        { _id: '1', name: 'Bun', type: 'bun', quantity: 0 },
        { _id: '2', name: 'Sauce', type: 'sauce', quantity: 0 },
      ],
    };
    expect(ingredientsReducer(initialStateWithIngredients, action)).toEqual(
      expectedState
    );
  });
});