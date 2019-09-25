declare global {
  namespace Cypress {
    interface Chainable {
      
      /**
       * types in @username , @password and clicks login
       */
      login: typeof login
    }
  }
}

export function login() {
  return cy.login();
}
Cypress.Commands.add('login', (username, password) => {
  cy.get('#username_field').type(username);
  cy.get('#password_field').type(password);
  cy.get('#login_button').click();
});
