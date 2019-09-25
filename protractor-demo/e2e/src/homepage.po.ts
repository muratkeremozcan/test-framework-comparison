import { by, element } from 'protractor';
import { LoginPage } from './loginpage.po';

export class HomePage {
  getSuccessText() {
    return element(by.id('success')).getText();
  }

  getErrorText() {
    return element(by.id('failure')).getText();
  }

  async logout(): Promise<LoginPage> {
    await element(by.id('logout-button')).click();
    return new LoginPage();
  }
}
