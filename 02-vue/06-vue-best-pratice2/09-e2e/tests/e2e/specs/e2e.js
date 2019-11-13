describe("端到端测试，抢测试人员的饭碗", () => {
  it("模拟登录成功流程", () => {
    cy.visit("/");
    // cy.contains('h1', 'Welcome to Your Vue.js App')
    cy.contains("#message", "未登录");

    const text = "admin";
    cy.get("#username")
      .focus()
      .type(text, { delay: 1000 });

    cy.get("#password")
      .focus()
      .type(11, { delay: 500 });

    cy.get("button").click();
  });

  it("模拟登录失败的流程", () => {
    cy.visit("/");
    // cy.contains('h1', 'Welcome to Your Vue.js App')
    cy.contains("#message", "未登录");

    const text = "admin11";
    cy.get("#username")
      .focus()
      .type(text, { delay: 1000 });

    cy.get("#password")
      .focus()
      .type(11, { delay: 500 });

    cy.get("button").click();
  });

  // it("测试用例失败的方法", () => {
  //   cy.visit("/");
  //   cy.contains("h1", "用户名");
  // });
});
