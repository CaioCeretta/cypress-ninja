## When needed to mimic a location

assume we have something like

```js
cy.visit('http://localhost:8000', {
  onBeforeLoad(win) {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition')
    .callsFake((cb) => {
      cb({
        coords: {
          latitude: -23.55052,
          longitude: -46.633308
        }
      })
    })
  }
})
```

We are using Cypress, which is end-to-end test tool for web applications

The objective of that code is

Open that page pretending that the user browser is inside a given location

This is needed because:

• Cypress doesn't use real location of our computer
• Browsers request location permission
• In tests, we need a predictable value.

### 1. cy.visit()

cu.visit accepts two parameters

1. URL (string)
2. Options Object (optional)

We are using the options object where we have the onBeforeLoad

### 2. onBeforeLoad

onBeforeLoad(win) {
  // code
}


#### `win` parameter

win is the window object of the page
it is the equivalent of browser's js window

What is it?

a callback function cypress executes BEFORE the page completely loads.

This is critic for

. Overwriting the browser's API
. Simulate a behavior (like geolocation)

### cy.intercept()

cy.intercept() does not make the request

he just tells cypress

"When any request that hit this pattern occurs, i want to know"

This creates a listener
It doesn't wait for anything
It doesn't pause the test
It doesn't ensure DOM rendering.

It's like turning on a camera to film the street, it does not do anything in case a car passes.

#### What he does not do

Doesn't fire a request, nor expects data, nor ensures that the DOM has changed.

### cy.wait(`@getClientCard`) - Wait the request to happen

cy.wait tells cypress: "Pause the test until this specific request happen"

He waits the request to leave, the request to come back, and its status is received (200, 304, etc)











