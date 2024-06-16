import { describe, expect, it } from "vitest";
import {
  constructorReducer as reducer,
  constructorInitialState as initialState,
  ConstructorState,
} from "./burger-constructor";
import { TBurgerConstructorActions } from "../actions/constructor-ingredients";
import {
  ADD_INGREDIENT,
  SORT_INGREDIENTS,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
} from "../constants/ingredients";

import { mockFetchedIngredient } from "../../test/__mocks__/ingredients";
import { TConstructorIngredient } from "../../utils/types";
import { mockBun, mockIngredient } from "../../test/__mocks__/burger-constructor";

describe("Burger Constructor Reducer", () => {
  it("should return the initial state", () => {
    const result = reducer(undefined, {} as TBurgerConstructorActions);
    expect(result).toEqual(initialState);
  });

  describe("should handle ADD_INGREDIENT", () => {
    it("should add a bun to the state", () => {
      const action: TBurgerConstructorActions = {
        type: ADD_INGREDIENT,
        payload: mockBun,
      };
      const expectedState: ConstructorState = {
        ...initialState,
        addedIngredients: {
          buns: mockBun,
          ingredients: [],
        },
      };
      const result = reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });

    it("should add an ingredient to the state", () => {
      const action: TBurgerConstructorActions = {
        type: ADD_INGREDIENT,
        payload: mockIngredient,
      };
      const expectedState: ConstructorState = {
        ...initialState,
        addedIngredients: {
          buns: null,
          ingredients: [mockIngredient],
        },
      };
      const result = reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  });

  it("should sort ingredients", () => {
    const mockIngredients: TConstructorIngredient[] = [
      {
        _id: "1",
        name: "Ingredient 1",
        type: "main",
        quantity: 0,
        ...mockFetchedIngredient,
        id: "ingredientId1",
      },
      {
        _id: "2",
        name: "Ingredient 2",
        type: "sauce",
        quantity: 0,
        ...mockFetchedIngredient,
        id: "ingredientId2",
      },
    ];
    const action: TBurgerConstructorActions = {
      type: SORT_INGREDIENTS,
      payload: mockIngredients,
    };
    const expectedState: ConstructorState = {
      ...initialState,
      addedIngredients: {
        buns: null,
        ingredients: mockIngredients,
      },
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it("should handle an ingredient being deleted from constructor", () => {
    const mockIngredients: TConstructorIngredient[] = [
      {
        _id: "1",
        name: "Ingredient 1",
        type: "main",
        quantity: 0,
        ...mockFetchedIngredient,
        id: "ingredientId1",
      },
      {
        _id: "2",
        name: "Ingredient 2",
        type: "sauce",
        quantity: 0,
        ...mockFetchedIngredient,
        id: "ingredientId2",
      },
    ];
    const initialStateWithIngredients: ConstructorState = {
      ...initialState,
      addedIngredients: {
        buns: null,
        ingredients: mockIngredients,
      },
    };
    const action: TBurgerConstructorActions = {
      type: DELETE_INGREDIENT,
      payload: "ingredientId1",
    };
    const expectedState: ConstructorState = {
      ...initialStateWithIngredients,
      addedIngredients: {
        buns: null,
        ingredients: [
          {
            _id: "2",
            name: "Ingredient 2",
            type: "sauce",
            quantity: 0,
            ...mockFetchedIngredient,
            id: "ingredientId2",
          },
        ],
      },
    };
    const result = reducer(initialStateWithIngredients, action);

    expect(result).toEqual(expectedState);
  });

  it("should empty contructor", () => {
    const initialStateWithIngredients: ConstructorState = {
      ...initialState,
      addedIngredients: {
        buns: {
          _id: "1",
          name: "Bun",
          type: "bun",
          quantity: 0,
          ...mockFetchedIngredient,
          id: "bunId",
        },
        ingredients: [
          {
            _id: "2",
            name: "Ingredient",
            type: "main",
            quantity: 0,
            ...mockFetchedIngredient,
            id: "ingredientId",
          },
        ],
      },
    };
    const action: TBurgerConstructorActions = {
      type: RESET_CONSTRUCTOR,
    };
    const expectedState: ConstructorState = {
      ...initialState,
    };
    const result = reducer(initialStateWithIngredients, action);
    expect(result).toEqual(expectedState);
  });
});
