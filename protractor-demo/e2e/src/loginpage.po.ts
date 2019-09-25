import { browser, by, element } from 'protractor';

export class LoginPage {
  usernameField = element(by.id('username_field'));
  passwordField = element(by.id('password_field'));
  loginDescription = element(by.id('login-message'));
  loginButton = element(by.id('login_button'));

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return this.loginDescription.getText();
  }

  login(username: string, password: string) {
    this.usernameField.sendKeys(username);
    this.passwordField.sendKeys(password);
    this.loginButton.click();
  }
}
