import { API_URL, ENDPOINT } from "../../src/utils/consts";
import { BUN_STUB_TEXT, LOGIN_TITLE } from "../../src/utils/text-contents";
const userInfo = {
  name: "Bob",
  email: "qwerty@qwe.com",
  password: "8473ihrnebfjsdhfiusery938232",
};
describe("BurgerConstructor", () => {
  beforeEach(() => {

    cy.intercept("GET", `${API_URL}${ENDPOINT.ingredients}`, {
      fixture: "ingredients.json",
    }).as("get-ingredients");
    cy.intercept("POST", `${API_URL}${ENDPOINT.login}`, {
      fixture: "login.json",
    }).as("login");
    cy.intercept("POST", `${API_URL}${ENDPOINT.orders}`, {
      fixture: "make-order.json",
    }).as("make-order");
    cy.visit("/");

    cy.get("[data-cy=constructor-submit]").as("submit-button");
  });

  it("should constructor be empty", () => {
    cy.get("[data-cy=stub-text]")
      .first()
      .should("have.text", BUN_STUB_TEXT)
      .last()
      .should("have.text", BUN_STUB_TEXT);
    cy.get("@submit-button").should("be.disabled");
  });

  it("should d&d", () => {
    cy.get("[data-cy=dragged-card]")
      .first()
      .as("drag-bun")
      .trigger("dragstart")
      .trigger("dragleave");

    cy.get("[data-cy=ingredients-destination]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get("[data-cy=dragged-card]")
      .last()
      .as("drag-filling")
      .trigger("dragstart")
      .trigger("dragleave");

    cy.get("[data-cy=ingredients-destination]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");
    cy.get("@submit-button").should("be.enabled");
    cy.get("@submit-button").click();

    cy.get("[data-cy=login-title]")
      .should("be.visible")
      .and("contain", LOGIN_TITLE);

    cy.get("[name=email]").type(userInfo.email);
    cy.get("[name=password]").type(userInfo.password);
    cy.get("[data-cy=submit-button]").click();

    cy.wait("@login");

    cy.get("@submit-button").click();

    cy.get("[data-cy=order-modal]").should("be.visible");

  });
});
