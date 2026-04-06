describe("login", () => {
  it.only("should login successfully", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");

    // Simulating a bug changing the welcome message text
    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes.",
      );
  });

  it("should not login with invalid password", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana321");
    // Simulating a bug changing the error text

    /* The problem in both errors is that is taking 10 seconds to report a failure. This should'nt take so long, but this
    is because we modified the cypress.config and imposed a new timeout value.

    However, we should delete that configuration to go back to cypress's default timeout, which is 4 seconds
    
    */
    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("should not login with non-registered email", () => {
    cy.start();
    cy.submitLoginForm("papitoo@webdojo.com", "katana123");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
});
