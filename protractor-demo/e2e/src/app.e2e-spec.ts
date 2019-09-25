import { LoginPage } from './loginpage.po';
import { HomePage } from './homepage.po';

describe('Protractor Demo', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.navigateTo();
  });

  describe('Landing Page', () => {
    it('should display login instructions', () => {
      expect(loginPage.getParagraphText()).toEqual('Please input your user name and password and click the login button.');
    });
  });

  describe('Authentication Workflow', () => {
    beforeEach(() => {
      loginPage.login('demo', 'mode');
      homePage = new HomePage();
    });
    it('should accept valid login credentials', () => {
      expect(homePage.getSuccessText()).toEqual('Login succeeded. Now you can logout.');
    });
    it('should logout and redirect to the landing page', async () => {
      loginPage = await homePage.logout();
      expect(loginPage.getParagraphText()).toEqual('Please input your user name and password and click the login button.');
    });
  });

  describe('Invalid Cases ', async () => {
    invalidCase('invalid', 'mode', 'should reject Invalid Username');
    invalidCase('demo', 'invalid', 'should reject Invalid Password ');
    invalidCase('invalid', 'whatever', 'should reject Invalid Username And Password ');
    invalidCase('', 'mode', 'should reject Empty Username');
    invalidCase('demo', '', 'should reject Empty Password');
    invalidCase('', '', 'should reject Empty Username And Password');
  
    function invalidCase(userName: string, password: string, testDescription: string) {
      it(testDescription, () => {
        loginPage.login(userName, password);
        homePage = new HomePage();
        expect(homePage.getErrorText()).toEqual('Login failed. Invalid user name and/or password.');
      });
    }
  });


});
