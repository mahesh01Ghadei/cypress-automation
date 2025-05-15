Cypress.Commands.add('login', (username,password) => {
    cy.visit('/auth/login')
    cy.get("[name='username']").type(username)
    cy.get("[name='password']").type(password)
    cy.get("button[type='submit']").click()
})
