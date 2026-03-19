## Commands and important concepts

**Serve:** Creates a mini web server locally in a way that the web application runs on that path.
_
**npx cypress open:** Executes cypress in a interactive mode. It is the visual interface of cypress
_
**describe:** used to group of a set of automated tests
_
**it:** a function that implements an automated test
_
**cy.viewport(w, h):** Creates a window* with the defined viewport
_
**cy.visit(url): Visits the given url
_**
**cy.get('selector'):** This is a command to target a specific element of the DOM. Since cypress is async, it works like
a message queue, not a immediate object return.

This means that we don't need to save the elements into a variable, but to directly chain the commands or using the
.then command if we need to manipulate it in a more complex manner. like

```ts
cy.get('.product-price').then(($element) => {
  const text = $element.text();
  expect(text).to.contain('R$ 50,00');
})
```

Here we are selecting the element with the product-price class, and inside the .then(($element)), that $element will consist
of the jQuery object that contains the DOM element
_
**cy.contains("text"):** This way we can check if a certain text is shown in the scr een
_
**aliases**: If we would like to reuse a selector multiple times, the "Cypress" way of creating a "variable" is to chain a,
for example, get, with a `.as()` function. like

`cy.get('header button.side-menu').as('buttonSideMenu');`

Now we can select this element using that nickname, prefixed with @. Therefore, when doing
`cy.get('@buttonSideMenu').click()`, we select that given element click.
'
_
**`cy.get('selector').type('value**')`:** This is the function we use in order to input something to any "typable" element or
that can receive a focus event from the keyboard.

It is essentially used on input elements.
_
**element.contains(tag, text):** This is the way we usually use to target elements that can't be targeted by the "normal
ways", like styling classes or classes with too much special characters.
_
**cy.wait(duration):** How much time we want to wait after an action was sent, like a click
_
**data.cy property:** This property was set by the developer to easy and help the automation flow. These properties are common
for cypress so it can use them inside the whole automation process. 
_
**should('be.visible'):** This was chained to the get, and said that the element selected SHOULD be visible.
_
**.and("have.text", "Fernando Papito"):** and is usually chained after the should function. It first saw that the element is
visible, and then, check if the text of the element is the second parameter one.
_
**it("assertion").only(..., () => {...}):** This way we execute only that given assertion

## Configuration

When running the cypress visual interface. We choose the E2E option and choose these options respectively

1. inform the config file for the tests
2. support file for e2e tests
3. support file with custom cypress commands
4. fixtures example.json

After clicking on continue, we choose a browser where the cypress tests will run. We usually choose electron which is
cypress's default browser.


### First spec

Scaffold: Already bring some in-the-box examples
Create new spec: test from scratch <- Option chosen

When clicking on that option, it will prompt us to give  a name for the cypress file that will be saved on the folder
`cypress/e2e/specName.cy.js

By creating the first test, it will already create a base structure for us. This first test will basically only access
cypress example page.

Cypress testing page also has an aim icon, that when we click on it, it works like the dev tools cursor, showing us how
we can use to target a given element.

Cypress tests usually consist of:

. the js file containing the test
. a fixture file, which is a file that commands for that test and a e2e.js, which imports the commands and is processed
before the tests.

### XPath

In the context of cypress, XPath is a query language used to navigate across the DOM and locate elements. Although
cypress use css selectors by default, it allows us to use XPaths

#### XPath anatomy

Imagine we are giving an address to the computer

//: Search in any part of the document (it doesn't have to be the first element)
button: The element has to be a html tag <button>
[...]: Here we filter (a condition)
text()=Entrar: The condition is that the visible text inside the button is exactly "Entrar"

### Selectors

If on cypress, we click on the button to see the suggested way to select that element. The button gave us
`cy.get('.bg-\[\#8257E5\]')`. But this is the tailwind class we used to make the button purple, we have to
be more specific in which element we are choosing, despite the fact that it has brackets, slashes, and so.

Styling classes should not be used as selectors for tests.

One good "locator" we could use for these cases where we don't have a specific class or an id, would be using a XPath
like: //button[text()="Entrar"]

However, cypress, by default, don't support xpath. 

## Assert/Expected

The term "assert" in Cypress (and in almost any testing framework), are the checks we write to verify that our application
behaves the way we expect.
They're how our tests decide whether something passes or fails. We can think of them as "proof points"

An assertion is basic a statement that says:

"The element value/state **should be** like this. If the assertion is true -> test passes, otherwise, fails.


## First e2e test

As soon as we, inputted an e-mail, a password, clicked on the login, and checked if the shown page has an expected text,
it was a simple, yet an e2e example.

## Cypress Commands

We often see cases, like the login page, where we may encounter similar behavior, but with different outcomes. Take the
login tests as example. In both tests we set the same viewport, visit the same page, type something on the same inputs,
and it would be great if we have a way to unify these steps.

A way we can encapsulate these steps and make a code reuse is through the commands.js file located inside cypress/support
folder.  

### Cypress.Commands.add('commandName', () => { // function body })

Inside the Commands file, we use this command in a way that it encapsulates a given instruction to a given command name
which will then be reused.

So a command be dynamic and flexible, we can receive arguments to input to that instruction, which will be the email and
password, in the first case.

After creating the command and saving, we can go back to the login.cy file, and in the tests, reuse this new commands by
replacing that snippet with the command and by passing the parameters we were already giving.

e.g. `cy.submeterLogin("papito@webdojo.com", "katana123");`

And we can still see that the test timeline, and so. Continues the exact same. For cypress, nothing changed

### More customizing

We need to think one thing. The main objective of that encapsulation is for the form filling and the form submit. But this
encapsulation, also visits a page and defines the viewport.

Here, we have steps that do more than just that. So we can create a custom command, separate from the form submission one.

