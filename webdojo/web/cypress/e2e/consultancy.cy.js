describe("Consultancy Form", () => {
  it("Should implement individual consultancy", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");
  });
});
