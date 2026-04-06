describe("Simulando mouseover", () => {
  it("Deve mostrar um texto ao passar o mouse em cima do link do instagram", () => {
    cy.start();

    cy.submitLoginForm("papito@webdojo.com", "katana123");

    /* We want to simulate a mousover, but cypress doesn't have native support to it, it does not have a function hover or
    a function called mouse.
    
    This is considered a cypress tradeoff. Which forces us to download an external library to do this 'cypress-real-events'
    and import it inside the support/commands.js file and now we are able to call methods like selector.realHover() */

    cy.contains("Isso é Mouseover!").should("not.exist");
    cy.get('[data-cy="instagram-link"]').realHover();
    cy.contains("Isso é Mouseover!").should("exist");
  });
});
