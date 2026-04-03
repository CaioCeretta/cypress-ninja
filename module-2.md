## Module Focus

When we login on the authenticated dashboard. We have four quick access squares

"Formulários": Where we have the specific forms for a web app. When we click on it, we got are moved to a route
`/consultancy`, and a form to request a consultancy service. 

The consultancy form consist of input fields for

Full Name - Input Text
Email - Input Text
Phone - Input Text
Type of Consultancy - Input Text
Type of Person - Two Radio Buttons
CPF - Input Text (In case the type of person is "física"  (individual))
CNPJ - Input Text (In case the type of person is "jurídica" ( entity))
How you met us? - Multiple radio buttons
File - upload input (limited to 5mb)
More Details - Textarea
Technologies - Input Text
Approve Terms - Checkbox 
Send Form - Button

And in this module we will look forward in understanding how to handle this data input form.

## Lesson 1 - Implementing Baby Steps on the Tests

We will start by the consultancy form. To reach the consultancy form, we must first login, and click on the corresponding
div to open that form. These are pre conditions for our test.

First, use the commands we have create on the commands.js. The one to start and the other to fill the login.

After the login was made, we are going to click on the consultancy form block.

The shot mark, on the cypress ui, if we click on that div, it will show us a selector that selects the nth child of the
div, then the grid item, and so on. This is not a good practice when choosing our selector, because in case we add one
or more items to that list, this can make that that selector is not selected anymore.

What we can do in this case is, to inspect that form div on the browser, and notice that this div is wrapped by a button.
Yet, that button doesn't have an id, or classes that are not styling ones.

However, by expanding that button element, we can see that we have a child div, and this div has two other divs, one that
groups the icon and the other one groups the title. These texts are oriented to the behavior of the webpage.
Let's say we want to fill a form. We will select the button that has the "Formulário" text.

So in these cases where we don't have an id or a specific class, texts are the best options. which will end up to be

`cy.contains('h4', 'Formulários')`

And we can also target the parent of that component, by chaining the contains call with a parent() call, this will
target the div that groups the title/description. And by chaining it more times we finally target the button that wraps
that h4 and receives the click

However, other than using these chained `parent()`s we can use the contains and target the button that has a children with
the given text. So instead of h4, we are able to target the button directly

With XPATH, the same thing would be " //h4[text()="Formulários"]/../../..", where the /.. is the same as we have on the 
terminal, where it moves up a folder, in this case, back to the parent.
If we were using selenium we would use this XPath

### checkpoint

Now that we reached the formulários page, we can implement a checkpoint with

`cy.contains("h1", "Consultoria").should("be.visible");`

This is a simple assertion we can use to checkpoint where we current are at the
tests and check if our ideal e2e path is following the correct flow..

### Making the test dynamic

Since we will have other tests, accessing other items on the quick access tab,
we can create a `Command` like we did on the login tests, where the arguments that
we will have to pass are the name of the button (like formularios) and the title
of the page (like "Consultoria")

