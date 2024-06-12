context("BurgerConstructor", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients.json",
    }).as("get-ingredients");
  });

  it('should constructor be empty',()=>{})

  it("should d&d", () => {
    cy.get("[data-cy=dragged-card]")
      .first()
      .as("drag-card")
      .trigger("dragstart")
      .trigger("dragleave");

    cy.get("[data-cy=ingredients-destination]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");
  });
});
