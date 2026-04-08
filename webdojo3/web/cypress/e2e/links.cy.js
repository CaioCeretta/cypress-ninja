describe("Links abrindo nova guia/janela", () => {
  it("Validando o atributo do link do instagram", () => {
    /* One time we are in a cypress test, and click on the instagram button, the system opens a new window or tab with
    that given page. Cypress does not have support to work with multiple tabs, It doesn't switch the tabs on the browser
    to interact with the app. It remain exclusvely on the origin tab.
    
    The cypress team understands that when we click on a button that goes to another tab, we are accessing other application.
    Therefore, we need an automated test specific to that application.
    
    Let's use the instagram example. Inside of the webdojo we have a link to instagram. Therefore, our test must limit to
    the point of clicking on the button. But how do we ensure that by clicking on that link the system will open our instagram
    profile when we click on it? Since instagram is another app.
    
    We can do this, by validating the attribute of the link*/

    cy.start();

    cy.submitLoginForm("papito@webdojo.com", "katana123");

    /*  cy.get('[data-cy="instagram-link"]').click(); // This way cypress will open the instagram tab, however it can't
     interact with it, and we are not qa from instagram
     
     When we inspect the instagram link element, it has two interesting properties which are href and the target="_blank"
     */

    cy.get('[data-cy="instagram-link"]')
      .should("have.attr", "href", "https://www.instagram.com/papitoqa")
      .and("have.attr", "target", "_blank");

    /* Let's now imagine that we have a link, inside our own app, that enters another tab, defined by the attribute
    target=_blank, how can we work around this?
    
    Let's take the consultancy for this example. The consultancy form, on the use terms, there is a link that we click
    on it, and another tab opens. How can we do do test this?

    */
  });

  it("Acessa link de termos de uso removendo o target _blank", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    /* Reminder:
    There are three reasons why the Formulários, which is a h4, was able to be clicked

    1. Cypress clicks on the element that contains the text
      When we execute cy.contains("Formulários"). Cypress identifies the most internal element that contains that text.
      In this case, the h4.

      By default, the click() command is fired on the center of the returned element. Since our h4 is visible and inside
      a button. cypress successfuly clicks on it

    2. Event Bubbling
    
    In the JS development. There is a concept called *Event Bubbling*. WHen clicking on the h4, the click event doesn't
    stop right there. It goes up to the parents

    1. Click on h4
    2. The event moves up to the div
    3. Event reaches the button
    4. Browser executes the action linked to the button

    3. The Element is "actionable"

    Cypress has an internal verification before clicking. It ensures that the element

    . Isn't hidden
    . Isn't covered by another element
    . It isn't disabled

    Since our h4 is part of the button visual area. For Cypress it is a perfectly valid target to receive a click

    Even though we could target it like it is below. a better practice would be cy.contains('button', 'Formulários').click();
    It fetches the button that CONTAIS the text "formulário"

    This way, cypress fetches specifically the <button> tag that has this text INSIDE of it.

    */
    cy.contains("Formulários").click();

    /* cypress will open the link on another tab and won't be able to interact with it, so we can call an "invoke" function
    to remove the target attribute, just for the tests, and it will work just fine
    */

    cy.contains("a", "termos de uso").invoke("removeAttr", "target").click();

    cy.contains(
      "p",
      "Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.",
    );
  });
});
