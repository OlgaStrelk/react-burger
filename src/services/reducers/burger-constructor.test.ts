import { expect, test, describe } from "vitest";
import {
  ConstructorState,
  constructorReducer as reducer,
} from "./burger-constructor";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  SORT_INGREDIENTS,
} from "../constants/ingredients";
import {
  FILLING_INGREDIENT,
  BUN_INGREDIENT,
  INGREDIENTS_ARRAY,
  SORTED_ARRAY,
  NEW_BUN_INGREDIENT,
  INGREDIENT_ARRAY_MINUS_ONE,
} from "../../__test__/__mocks__/burger-constructor";

const initialState: ConstructorState = {
  addedIngredients: {
    buns: null,
    ingredients: [],
  },
};
describe("burger constructor reducer", () => {
  test("should handle an ingredient being added to empty constructor", () => {
    const previousState: ConstructorState = initialState;
    const result = reducer(previousState, {
      type: ADD_INGREDIENT,
      payload: FILLING_INGREDIENT,
    });
    const expectedState: ConstructorState = {
      addedIngredients: {
        buns: null,
        ingredients: [FILLING_INGREDIENT],
      },
    };
    expect(result).toEqual(expectedState);
  });

  test("should handle an ingredient being added to an existing list", () => {
    const previousState: ConstructorState = {
      addedIngredients: {
        buns: BUN_INGREDIENT,
        ingredients: INGREDIENTS_ARRAY,
      },
    };

    const result = reducer(previousState, {
      type: ADD_INGREDIENT,
      payload: FILLING_INGREDIENT,
    });

    const expectedState = {
      addedIngredients: {
        buns: BUN_INGREDIENT,
        ingredients: [...INGREDIENTS_ARRAY, FILLING_INGREDIENT],
      },
    };
    expect(result).toEqual(expectedState);
  });

  test("should handle a bun being added to empty constructor", () => {
    const previousState: ConstructorState = initialState;
    const result = reducer(previousState, {
      type: ADD_INGREDIENT,
      payload: BUN_INGREDIENT,
    });
    const expectedState = {
      addedIngredients: {
        buns: BUN_INGREDIENT,
        ingredients: [],
      },
    };
    expect(result).toEqual(expectedState);
  });

  test("should handle a bun being added to constructor with existing bun and replace it", () => {
    const previousState: ConstructorState = {
      addedIngredients: {
        buns: BUN_INGREDIENT,
        ingredients: INGREDIENTS_ARRAY,
      },
    };
    const result = reducer(previousState, {
      type: ADD_INGREDIENT,
      payload: NEW_BUN_INGREDIENT,
    });
    const expectedState = {
      addedIngredients: {
        buns: NEW_BUN_INGREDIENT,
        ingredients: INGREDIENTS_ARRAY,
      },
    };
    expect(result).toEqual(expectedState);
  });

  test("should sort ingredients", () => {
    const previousState: ConstructorState = {
      addedIngredients: {
        buns: BUN_INGREDIENT,
        ingredients: INGREDIENTS_ARRAY,
      },
    };

    const result = reducer(previousState, {
      type: SORT_INGREDIENTS,
      payload: SORTED_ARRAY,
    });
    const expectedState = {
      addedIngredients: {
        buns: BUN_INGREDIENT,
        ingredients: SORTED_ARRAY,
      },
    };
    expect(result).toEqual(expectedState);
  });

  test("should handle an ingredient being deleted from constructor", () => {
    const previousState: ConstructorState = {
      addedIngredients: {
        buns: BUN_INGREDIENT,
        ingredients: INGREDIENTS_ARRAY,
      },
    };

    const deletedIngredientId = INGREDIENTS_ARRAY[1].id;

    const result = reducer(previousState, {
      type: DELETE_INGREDIENT,
      payload: deletedIngredientId,
    });

    const expectedState = {
      addedIngredients: {
        buns: BUN_INGREDIENT,
        ingredients: INGREDIENT_ARRAY_MINUS_ONE,
      },
    };
    expect(result).toEqual(expectedState);
  });

  test("should empty contructor", () => {
    const previousState: ConstructorState = {
      addedIngredients: {
        buns: BUN_INGREDIENT,
        ingredients: INGREDIENTS_ARRAY,
      },
    };

    const result = reducer(previousState, {
      type: RESET_CONSTRUCTOR,
    });

    const expectedState = initialState;
    expect(result).toEqual(expectedState);
  });
});
