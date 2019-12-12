// https://docs.cypress.io/api/introduction/api.html

describe("抢测试人员饭碗", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("访问首页", () => {
    cy.contains("div", "Hello World");
  });
});
