export const login = {

    visit : () => { cy.visit('/auth/login') },
    enterUsername : (username) => { cy.get("[name='username']").type(username) },
    enterPassword : (password) => { cy.get("[name='password']").type(password) },
    clickLogin : () => { cy.get("button[type='submit']").click() },
    verifyLoggedIn : () => { 
        cy.location('pathname').should("contain" , "/dashboard/index")
        cy.get("[alt='client brand banner']").should("be.visible")
    },
    verifyInvalidCredentialErrMsg : () => { cy.xpath("//*[text()='Invalid credentials']").should("be.visible") },
    verifyRequiredFieldMissingErrMsg : () => { cy.xpath("//*[text()='Required']").should("exist") }
}
