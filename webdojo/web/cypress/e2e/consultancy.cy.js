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

    // cy.get("#name").type("Caio Ceretta");
    // cy.get("#email").type("caioceretta@gmail.com");

    /* These elements are simple to be targeted since they have unique ids, but nowadays, it's common for elements to not
    have an id. However, inputs commonly have a placeholder, and they usually are unique. If we do not have any relevant
    classes or ids, because many times the classes are uniquely dedicated to styling.

    If by any chance, we don't have any of class with a "cool" name, like "txt-name", which is a name that is coherent to
    the objective of that element, which we could use to target it. Placeholders end up being the best strategy.

    To make use of placeholders, first we need to find the html tag, which is "input" and add something as

    `cy.get('input[placeholder="Digite seu nome completo"]').type(
      "Caio Ceretta",
    );
    `
    */
    cy.get('input[placeholder="Digite seu nome completo"]').type(
      "Caio Ceretta",
    );
    cy.get('input[type="email"]').type("caioceretta@gmail.com");

    /* In this case, the placeholder is like the input's real mask. However, to prevent that this input goes to production
    with an incorrect mask, we can add a should assertion, like: */
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("15981653557")
      .should("have.value", "(15) 98165-3557");
    // This way, we can verify if the mask is correct following the pattern expected by the developer

    /* Select. We click on the element, that is an HTML, and the select options are shown. But we need to be careful, these
  options we are seeing are HTML brought by the browser, and if that is not HTML, we cannot interact the click on the HTML.
  */
    // cy.get("#consultancyType").select("In Company");
    /* 
      What is shown on the browser when we click on a select. Is not an actual HTML. This is why we are using the function
      select, since we are not clicking on the element, but selecting it.
  
      If we look into the running tests, we can see that cypress cannot click on a browser component, yet, in HTML pages
      elements.

     We are selecting by the option text, but we could also select by the option value, which is the value attribute of
     the option element. For example:
    */
    // cy.get("#consultancyType").select("inCompany");

    /* Now, let's imagine that the select does not have an identifier. We can use XPaths for these cases like:
    `//label[text()="Tipo de Consultoria"]/..//select`. But again, cypress does not have native access to xpath. This is
    just an example, we target the lable, go up an element, and find the select.
     */

    /* A real scenario where the select does not have a good selector is by doing: */
    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("Individual");
  });

  
});
