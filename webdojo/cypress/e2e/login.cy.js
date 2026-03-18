describe("login", () => {
  it("should login successfully", () => {
    cy.viewport(1920, 1080);
    cy.visit("localhost:3000");

    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("katana123");

    cy.contains("button", "Entrar").click();

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");

    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes.",
      );
  });

  it("should not login with invalid password", () => {
    cy.viewport(1920, 1080);
    cy.visit("localhost:3000");

    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("katana321");

    cy.contains("button", "Entrar").click();

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("should not login with non-registered email", () => {
    cy.viewport(1920, 1080);
    cy.visit("localhost:3000");

    cy.get("#email").type("papitoo@webdojo.com");
    cy.get("#password").type("katana123");

    cy.contains("button", "Entrar").click();

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
});
