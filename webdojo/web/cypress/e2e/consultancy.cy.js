describe("Formulário de Consultoria", () => {
  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.contains("h4", "Formulários").should("be.visible");

    /* To target the button that wraps the h4 element, we can use the parent() command
    cy.contains("h4", "Formulários")
      .should("be.visible")
      .parent()
      .parent()
      .parent()
      .click();
    
      However, this approach is not recommended, because there are easier ways to do the same thing, like targeting the
      button that has a children with the given text
    */

    /* This way, we simply use the tag of the parent element, because cypress also looks for the text in the children of
    that element 
    cy.contains("button", "Formulários").should("be.visible").click();

    // Checkpoint. If we found "Consultoria" it means we are in the right step
    cy.contains("h1", "Consultoria").should("be.visible");
    */

    /* We can shrink this even more, by creating a custom command, telling the buttonName, that contains the
    text, and the pageTitle which is going to be the title of the desired page. By moving all of this to a custom command,
    we can see that these two "directions" we gave above, can now be reused in other tests.
    */

    cy.goTo("Formulários", "Consultoria");
  });
});
