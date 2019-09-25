//TODO: Investigate why referencing to the "types" field here works, but not in the tsconfig.json
// See: https://github.com/cypress-io/cypress/issues/1152

describe('Authentication Workflow', () => {
  beforeEach(() => {
    cy.visit('/'); // visits base url
  });
  it('should display login instructions', () => {
    cy.contains('Please input your user name and password and click the login button.');
  });
  it('should accept valid login credentials', () => {
    cy.login('demo', 'mode');
    cy.contains('Welcome Page');
  });
  it('should logout and redirect to the landing page', () => {
    cy.visit('/welcome.html');
    cy.get('#logout-button').click();
    cy.contains('Login Page');
  });
});

describe('Invalid Cases ', () => {
  invalidCase('invalid', 'mode', 'should reject Invalid Username');
  invalidCase('demo', 'invalid', 'should reject Invalid Password ');
  invalidCase('invalid', 'whatever', 'should reject Invalid Username And Password ');
  invalidCase(' ', 'mode', 'should reject Empty Username');
  invalidCase('demo', ' ', 'should reject Empty Password');
  invalidCase(' ', ' ', 'should reject Empty Username And Password');

  function invalidCase(userName, password, testDescription) {
    it(testDescription, () => {
      cy.visit('/');
      cy.login(userName, password);
      cy.contains('Login failed. Invalid user name and/or password.');
    });
  }
});

describe('environment variables', () => {
  it('has variable from cypress.json', () => {
    expect(Cypress.env('host')).to.equal('http://localhost:7272');
    expect(Cypress.env('google')).to.equal('https://www.google.com/');    
  });
  it('should visit the environment variable host', () => {
    cy.visit(Cypress.env('host'))
      .url('eq', 'http://localhost:7272')
  })
  it('should visit the environment variable google', () => {
    cy.visit(Cypress.env('google'))
      .url('eq', 'https://www.google.com/')
  })
});


