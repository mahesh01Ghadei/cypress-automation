import Login from '../pages/login.js';
import { testcase } from '../../support/testcase';

describe('Test Orange HRM Web Application Login Functionality', () => {

  let login;

  beforeEach(() => {
    cy.fixture('user').as('data');
    login = new Login();
  });

  testcase({ id: 'TCID-101', tags: ['regression', 'sanity'] }, function () {
    it('should login to the application with valid credential', function () {
        cy.login(this.data.validuser.username, this.data.validuser.password)
        login.verifyLoggedIn()
    });
  })

  testcase({ id: 'TCID-102', tags: ['regression', 'sanity'] }, function () {
    it("should not login to the application using invlid credential , we will get an error message" , function () {
        cy.login(this.data.invaliduser.username, this.data.invaliduser.password);
        login.verifyInvalidCredentialErrMsg()
    })
  })

  testcase({ id: 'TCID-103', tags: ['regression', 'sanity'] }, function ()  {
    it("should not login without providing data to all required fields", function () {
        login.open()
        login.enterUsername(this.data.validuser.username)
        login.clickLogin()
        login.verifyRequiredFieldMissingErrMsg()
    })
  })

});
