# cypress-demo

### Cypress [tutorial](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file)

### How to automatically add [Typescript support](https://www.cypress.io/blog/2017/12/11/an-alternative-to-protractor-for-angular-projects/#) for Angular applications

### On Page objects

  > *"I am a strong believer in utility functions rather than page objects - I think using functions simplifies code a lot."*

The creators of Cypress don't believe in OOP, and instead favor functional programming. 
They may have a point, because the main reason we introduced Page Objects to our Angular application testing was because Protractor out-of-the-box (and therefore Selenium) is *inadequate* with selectors and asynchronous behavior. 
Page Objects helped immensely with solving these problems.

On the other had, Cypress already addresses these issues out of the box. It may not be necessary to use this pattern.
A disadvantage to writing page objects and storing our test logic within them makes it tempting to write unit tests for our page objects, which is an extra layer of maintenance we certainly do not need to add.
