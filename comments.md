## Commands and important concepts

Serve: Creates a mini web server locally in a way that the web application runs on that path.
_
npx cypress open: Executes cypress in a interactive mode. It is the visual interface of cypress
_
describe: used to group of a set of automated tests
_
it: a function that implements an automated test
_
cy.viewport(w, h): Creates a window with the defined viewport
_
cy.visit(url): Visits the given url
_
cy.get('selector'): This is a command to target a specific element of the DOM. Since cypress is async, it works like
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
aliases: If we would like to reuse a selector multiple times, the "Cypress" way of creating a "variable" is to chain a,
for example, get, with a `.as()` function. like

`cy.get('header button.side-menu').as('buttonSideMenu');`

Now we can select this element using that nickname, prefixed with @. Therefore, when doing
`cy.get('@buttonSideMenu').click()`, we select that given element click.
'
_
`cy.get('selector').type('value')`: This is the function we use in order to input something to any "typable" element or
that can receive a focus event from the keyboard.

It is essentially used on input elements.
_



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
. a fixture file, which is a file that hommands for that test and a e2e.js, which imports the commands and is processed
before the tests.







