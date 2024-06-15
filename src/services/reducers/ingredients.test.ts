import { expect, test, describe } from "vitest";
import { IngredientsState, ingredientsReducer as reducer } from "./ingredients";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../constants/ingredients";
import { INGREDIENTS, INGREDIENTS_FETCHED } from "../../__test__/__mocks__/ingredients";
const initialState: IngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};
describe("burger constructor reducer", () => {
  test("should start ingredients request", () => {
    const previousState: IngredientsState = initialState;
    const result = reducer(previousState, {
      type: GET_INGREDIENTS_REQUEST,
    });
    const expectedState = {
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
    };
    expect(result).toEqual(expectedState);
  });

  test("should fetch ingredients", () => {
    const previousState: IngredientsState = initialState;
    const result = reducer(previousState, {
      type: GET_INGREDIENTS_SUCCESS,
      payload: INGREDIENTS_FETCHED
    });
    const expectedState = {
      ingredients: INGREDIENTS,
      ingredientsRequest: false,
      ingredientsFailed: false,
    };
    expect(result).toEqual(expectedState);
  });

  test("should fail ingredients request", () => {
    const previousState: IngredientsState = initialState;
    const result = reducer(previousState, {
      type: GET_INGREDIENTS_FAILED,
    });
    const expectedState = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: true,
    };
    expect(result).toEqual(expectedState);
  });

  test("should handle bun's quantity equal 2",()=>{
    
  })
});
