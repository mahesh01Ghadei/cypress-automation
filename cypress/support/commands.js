import Login from '../e2e/pages/login.js'; 

Cypress.Commands.add('login', (username, password) => {
  const loginPage = new Login();          
  loginPage.open();                        
  loginPage.enterUsername(username);
  loginPage.enterPassword(password);
  loginPage.clickLogin();
});
