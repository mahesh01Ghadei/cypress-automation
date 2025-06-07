export class BasePage {
  open(path) {
    return cy.visit(`${Cypress.env('BASE_URL')}`+`${path}`);
  }

  waitForElement(selector, timeout = 10000) {
    return cy.get(selector, { timeout }).should('be.visible');
  }

  getTitle() {
    return cy.title();
  }
}