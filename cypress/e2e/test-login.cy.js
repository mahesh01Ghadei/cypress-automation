import { login } from "../support/pageObjects/login.cy";

describe('Test Orange HRM Web Application Login Functionality' , () =>{
    
    let userData;
    beforeEach(() => {
        cy.fixture('user').then((data) => {
            userData = data
        })
    })

    it('Login to the application with valid credential' , () =>{
        
        cy.login(userData.validuser.username,userData.validuser.password)
        login.verifyLoggedIn()

    })

    it("Login using invlid credential to test error message" , () =>{

        cy.login(userData.invaliduser.username,userData.invaliduser.password)
        login.verifyInvalidCredentialErrMsg()

    })

    it("Login without providing data to all required fields", () => {
        login.visit()
        login.enterUsername(userData.validuser.username)
        login.clickLogin()
        login.verifyRequiredFieldMissingErrMsg()
    })

}) 