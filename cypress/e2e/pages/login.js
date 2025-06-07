import { BasePage } from './BasePage.js';
import { LOGIN_ENDPOINT , DASHBOARD_ENDPOINT } from '../config/routes.js';

const LoginLocators ={
  lblUserName : "[name='username']",
  lblPassword : "[name='password']",
  loginBtn : "button[type='submit']",
  homeBanner : "[alt='client brand banner']",
  invalidCredential : "//*[text()='Invalid credentials']",
  requireFieldErrMsg : "//*[text()='Required']"
}


class Login extends BasePage {

  open() {
    return super.open(LOGIN_ENDPOINT);
  }

  enterUsername(username) { cy.get(LoginLocators.lblUserName).type(username); }
  enterPassword(password) { cy.get(LoginLocators.lblPassword).type(password); }
  clickLogin() { cy.get(LoginLocators.loginBtn).click(); }
  verifyLoggedIn() {
    cy.get(LoginLocators.homeBanner).should('be.visible');
    cy.location('pathname').should('includes', DASHBOARD_ENDPOINT)
  }
  verifyInvalidCredentialErrMsg() { cy.xpath(LoginLocators.invalidCredential).should('be.visible'); }
  verifyRequiredFieldMissingErrMsg() { cy.xpath(LoginLocators.requireFieldErrMsg).should('exist'); }

}

export default Login;