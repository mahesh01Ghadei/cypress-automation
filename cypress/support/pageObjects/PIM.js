export const PIM = {
    clickOnPIMMenuItem : () =>{ cy.xpath("//span[text()='PIM']").click() },
    verifyPIMUrl : () => { cy.url().should("include" , "/pim/viewEmployeeList")},
    
    //Add new employee
    addEmployee : (firstname,middlename,lastname,empid,username,password) => {
        cy.xpath("//button[normalize-space()='Add']").click()
        cy.get("[name='firstName']").type(firstname)
        cy.get("[name='middleName']").type(middlename)
        cy.get("[name='lastName']").type(lastname)
        cy.xpath("//*[text()='Employee Id']/../..//input").clear().type(empid)
        cy.xpath("//*[text()='Create Login Details']/..//input").click({force: true})
        cy.xpath("//label[text()='Username']/../..//input").type(username)
        cy.xpath("//label[text()='Password']/../..//input").type(password)
        cy.xpath("//label[text()='Confirm Password']/../..//input").type(password)
        cy.get("button[type='submit']").click()
    },
    
    verifyEmployeeName : (firstName,lastName) => {
        cy.location('pathname' ,{ timeout: 10000 }).should('include', '/pim/viewPersonalDetails/');
        cy.xpath("//*[@class='orangehrm-edit-employee-name']/h6").should("be.visible").contains(firstName +" "+ lastName)
    },
    
    searchEmployee : (firstName) => {
        cy.xpath("//*[text()='Employee List']").click()
        cy.location('pathname').should('include', '/pim/viewEmployeeList');
        cy.xpath("//label[text()='Employee Name']/../..//input[@placeholder='Type for hints...']").type(firstName)
        cy.xpath("//button[@type='submit']").click()
    },

    //verify the added employee data in Employee list page 
    verifyInEmployeeList : (data) => {
        cy.xpath(`//*[contains(@class,'orangehrm-employee-list')]//*[contains(text(),'${data}')]`).should("exist")
    },

    //Edit job details of employee 
    
    clickOnEditBtn : (empid) => { cy.xpath(`//*[contains(@class,'orangehrm-employee-list')]//*[contains(text(),'${empid}')]/../..//button[1]`).click() } ,
    clickOnJobTab : () => { cy.xpath("//*[@class='orangehrm-edit-employee-navigation']//*[text()='Job']").click() },
    enterJoinedDate : (joineddate) => { cy.xpath("//*[text()='Joined Date']/../..//*[@class='oxd-date-input']/input").clear().type(joineddate) },
    selectJobTitle : (jobtitle) => {
         cy.xpath("//*[text()='Job Title']/../..//*[@class='oxd-select-text-input']").click(),
         cy.xpath("//*[text()='Job Title']/../..//*[@class='oxd-select-option']").contains(jobtitle).click()
    },
    clickOnSave : () => { cy.xpath("//*[@type='submit']").click() },
    
    verifyJoinedDate : (joineddate) => { cy.xpath("//*[text()='Joined Date']/../..//*[@class='oxd-date-input']/input").invoke("val").should("eq", joineddate) },
    verifyJobTitle : (jobtitle) => { cy.xpath("//*[text()='Job Title']/../..//*[@class='oxd-select-text-input']").should("have.text", jobtitle) },

    //Delete Employee
    deleteEmployee : (empid) => { 
        cy.xpath(`//*[contains(@class,'orangehrm-employee-list')]//*[contains(text(),'${empid}')]/../..//button[2]`).click() 
        cy.xpath("//button[normalize-space()='Yes, Delete']").should("be.visible").click()
        cy.xpath("//*[text()='Successfully Deleted']").should("exist")
    }

}