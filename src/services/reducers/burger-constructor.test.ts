import { expect, test } from "vitest";
import {
  ConstructorState,
  constructorReducer as reducer,
} from "./burger-constructor";
import { ADD_INGREDIENT } from "../constants/ingredients";
import {
  FILLING_INGREDIENT,
  BUN_INGREDIENT,
} from "../../__test__/__mocks__/ingredient";
test("init", () => {
  expect(true).toBeTruthy();
});
const initialState = {
  addedIngredients: {
    buns: null,
    ingredients: [],
  },
};
test("should handle a filling ingredient being added to constructor", () => {
  const previousState: ConstructorState = initialState;
  const action = reducer(previousState, {
    type: ADD_INGREDIENT,
    payload: FILLING_INGREDIENT,
  });
  const expectedState = {
    addedIngredients: {
      buns: null,
      ingredients: [FILLING_INGREDIENT],
    },
  };
  expect(action).toEqual(expectedState);
});
