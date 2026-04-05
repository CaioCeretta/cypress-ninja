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

    /* Dealing with radio buttons. In radio buttons is very common to find the property name.
    However, for radio buttons, in case we have two radio buttons for the same name, they will share the same name, but
    with different values, and this will make this not be a good option to be used.

    In these cases of a radio button where two radios share the same name. We should commonly retrieve the visual identification
    by the text, move to the parent element, so we can reach the child component. Many times, the input is inside the label
    that defines the description or title of the element.

    XPath: //span[text()="Pessoa Física"]/../input

    The way to do this without XPath is the following, where the label has both the radio input and the span with the text,
    since the span is a child of the label, we can find the span with the text, move to the parent element, and find the input

      cy.contains("span", "Pessoa Jurídica")
      .parent()
      .find('input[type="radio"]')
      .click();

    or, use the cypress resource, where we specify the type of the element, and the text that is inside it, and then we
    can find the input inside it.
    */

    cy.contains("label", "Pessoa Física").find("input[type='radio']").check();

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("not.be.checked");

    /* Let's now inspect the CPF field, that field is an input of type text, have an interesting id, which is document, but
    let's imagine that this ID is not there.
    
    We have a placeholder, with a bunch of 0's in the mask of the CPF. 000.000.000-00. 

    The .should(have.value) is a great way to check if the mask is correct, and if the value is being shown in the right
    way.
    cy.get('input[placeholder="000.000.000-00"]')
      .type("36531226005")
      .should("have.value", "365.312.260-05");

    This works, however, the placeholder of that field is not good for automation, its a "weird" value to use as a target
    for our automated tests
    
    According to the instructor, this is not a very intuitive nor clear way. Because it is not clear the kind of element
    that we are targeting.

    In this case, he prefers to use the label of the field, since it has the text "CPF"

    This is a location strategy where: The label and the input share the same parent. We move to the parent and find the
    input inside of it.
  */

    cy.contains("label", "CPF")
      .parent()
      .find('input[type="text"]')
      .type("36531226005")
      .should("have.value", "365.312.260-05");

    /* Checkboxes. Constant creation and iteration for the checkboxes texts */

    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });

    /*  File input: 

    We need to understand that in our case, the div where the text "Escolher arquivo" is on, it is not the actual input.
    And since that input is very hard to style. Developers usually hide the input, and create a div that is going to be
    the visual representation of the input, add the stylings to it, and hide the input
    The context is like:
    the label is the parent, and inside the label we have a div, with the text "Escolher arquivo", and we have the input
    of type file, that is hidden, as this div sibling. 
     
    The way used to attach a file, is to grab it usually from the fixtures folder, that is located inside the cypress
    folder.

    However, since the input is hidden, we cannot interact with it, and should we actually interact with it?
    But there is a reason for that element to be hidden, and the developer made sure that the user cannot interact with it.

    So we should as a second parameter of the selectFile function, add force: true to force the interaction with the element
    even if it is hidden

    */

    cy.get('input[type="file"]').selectFile("cypress/fixtures/document.pdf", {
      force: true,
    });

    /* Textarea element */
    cy.get(
      "textarea[placeholder='Descreva mais detalhes sobre sua necessidade']",
    ).type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at nisi neque. Etiam mollis interdum aliquam.",
    );

    /* Interacting with array of tags and simulatin a physical keyboard. The behavior of this text element is a bit different.
    We type the technology, press enter, and it adds that value to a list. It is not the field that stores the data. It
    only receives the value and that values are added to a tag element
    
    The way we can simulate the enter, which is a physical key of our keyboard is by adding a {type}
    */
    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type("Cypress")
      .type("{enter}");

    /* However, now we need to check if a span with the same inputted technology 
    cy.contains("span", "Cypress").should("be.visible");

    This is bad option, because we can have a span with the same text in another part of the page, and this would make
    our test messy. Because it validates the first occurence of that text on the screen.
    
    A way we can use to determine this, is the following
    
    We know that we have a label with the text Tecnologias, and that label is a sibling to the span of the technology span
    that showed up when we pressed enter. So we can go to the label, move up to the parent div, and directly target that
    span, in a way that there won't be any ambiguity.
    
    And a way we can use to add several technologies like the way we made the checkboxes is:*/

    const techs = ["Cypress", "Seleniun", "JavaScript", "React"];

    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    /* Accept terms:

    We have a div, that wraps a label, that wraps both an input and and a span that has a text and a link inside of it
    with the use terms. However, just the use terms is the link to send to a different page.

    In this selector, as we have already seen, "termos de uso" is a text that is inside an anchor inside a child element.
    Then, when it finds that label. It finds the input the input checkbox inside that element and check it.
    */
    cy.contains("label", "termos de uso")
      .find("input[type='checkbox']")
      .check();

    /* Submit form  */
    cy.contains("button", "Enviar formulário").click();

    cy.contains(
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
    ).should("be.visible");
  });

  it("Deve verificar os campos obrigatórios", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");

    cy.contains("button", "Enviar formulário").click();

    /* Testing the styling: We can chain an and function, where we assert that we expect that element to have a specific
    class. However, the element might no be in that expected color. Assume that the developer made something like adding
    a class text-red-400, but within that class, say that it will have the color green.
    
    What will happen in this case is that the class may pass, because the element indeed has that class, but visually, it
    won't be as expected. This means that only verifying the class won't ensure that the color is correct, which will ask
    us to chain another and*/
    cy.contains("p", "Campo obrigatório")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("p", "Campo obrigatório")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("p", "Você precisa aceitar os termos de uso")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });
});
