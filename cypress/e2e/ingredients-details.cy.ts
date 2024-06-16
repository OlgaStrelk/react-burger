import { API_URL, ENDPOINT } from "../../src/utils/consts";

describe("IngredientsDetails", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", `${API_URL}${ENDPOINT.ingredients}`, {
      fixture: "ingredients.json",
    }).as("get-ingredients");
  });

  it("should open and close modal with navigation", () => {
    cy.get("[data-cy=ingredient-card]").first().click().as("firstCard");
    cy.location("pathname").should("include", "ingredients");

    cy.get("[data-cy=ingredient-modal]").should("be.visible");

    cy.get("[data-cy=close-icon]")
      .click()
      .get("[data-cy=ingredient-modal]")
      .should("not.exist")
      .location("pathname")
      .should("not.include", "ingredients");
  });
});
