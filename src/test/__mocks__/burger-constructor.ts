import { TConstructorIngredient } from "../../utils/types";
import { mockFetchedIngredient } from "./ingredients";

export const mockBun: TConstructorIngredient = {
  _id: "1",
  name: "Bun",
  type: "bun",
  quantity: 0,
  ...mockFetchedIngredient,
  id: "bunId",
};
export const mockIngredient: TConstructorIngredient = {
  _id: "2",
  name: "Ingredient",
  type: "main",
  quantity: 0,
  ...mockFetchedIngredient,
  id: "ingredientId",
};
