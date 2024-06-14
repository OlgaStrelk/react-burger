import { expect, test, describe } from "vitest";
import {
  ConstructorState,
  constructorReducer as reducer,
} from "./burger-constructor";
import { ADD_INGREDIENT } from "../constants/ingredients";
import {
  FILLING_INGREDIENT,
  BUN_INGREDIENT,
} from "../../__test__/__mocks__/ingredient";

const initialState = {
  addedIngredients: {
    buns: null,
    ingredients: [],
  },
};
describe("burger constructor reducer", () => {
  test("should handle a filling ingredient being added to constructor", () => {
    const previousState: ConstructorState = initialState;
    const result = reducer(previousState, {
      type: ADD_INGREDIENT,
      payload: FILLING_INGREDIENT,
    });
    const expectedState = {
      addedIngredients: {
        buns: null,
        ingredients: [FILLING_INGREDIENT],
      },
    };
    expect(result).toEqual(expectedState);
  });

  test("should handle a bun being added to constructor", () => {
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
});
