describe("login", () => {
  it("should login successfully", () => {
    cy.viewport(1920, 1080);
    cy.visit("localhost:3000");

    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("katana123");
  });
});
