// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("Visits the app root url", () => {
    cy.contains("div", "Hello World");
  });
});
