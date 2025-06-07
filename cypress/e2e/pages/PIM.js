import { BasePage } from './BasePage.js';
import { EMPLOYEE_LIST_ENDPOINT , EMPLOYEE_PERSONALDETAILS_ENDPOINT } from '../config/routes.js';

const PIMLocators = {
  
  lblPIM : "//span[text()='PIM']",
  PIM_btnAdd : "//button[normalize-space()='Add']",
  PIM_fName : "[name='firstName']",
  PIM_mName : "[name='middleName']",
  PIM_lName : "[name='lastName']",
  PIM_EmpId : "//*[text()='Employee Id']/../..//input",
  PIM_btnCreateLoginDetail : "//*[text()='Create Login Details']/..//input",
  PIM_lblUsrName : "//label[text()='Username']/../..//input",
  PIM_lblPassword : "//label[text()='Password']/../..//input",
  PIM_lblConfirmPassword : "//label[text()='Confirm Password']/../..//input",
  PIM_btnSubmit : "button[type='submit']",

  lblEmpName : "//*[@class='orangehrm-edit-employee-name']/h6",
  btnEmpList : "//*[text()='Employee List']",
  lblSearchEmployee : "//label[text()='Employee Name']/../..//input[@placeholder='Type for hints...']",
  btnSearchSubmit : "//button[@type='submit']",

  btnConfirmDelete : "//button[normalize-space()='Yes, Delete']",
  txtMsgSuccessfullyDeleted : "//*[text()='Successfully Deleted']",

  lblJobTab : "//*[@class='orangehrm-edit-employee-navigation']//*[text()='Job']",
  lblJoinDate : "//*[text()='Joined Date']/../..//*[@class='oxd-date-input']/input",
  drpDwnJobTitle : "//*[text()='Job Title']/../..//*[@class='oxd-select-text-input']",
  drpDwnOption : "//*[text()='Job Title']/../..//*[@class='oxd-select-option']",
  btnSaveJobDetail : "//*[@type='submit']",

  // Dynamic elements 
  txtEmployeeData : (data) => `//*[contains(@class,'orangehrm-employee-list')]//*[contains(text(),'${data}')]`,
  btnEditInEmpList : (empid) => `//*[contains(@class,'orangehrm-employee-list')]//*[contains(text(),'${empid}')]/../..//button[1]`,
  btnDeleteEmpList : (empid) => `//*[contains(@class,'orangehrm-employee-list')]//*[contains(text(),'${empid}')]/../..//button[2]`

}

class PIM extends BasePage {
    clickOnPIMMenuItem(){ cy.xpath(PIMLocators.lblPIM).click() }
    verifyPIMUrl() { cy.url().should("include" , EMPLOYEE_LIST_ENDPOINT) }
    
    //Add new employee
    addEmployee (firstname,middlename,lastname,empid,username,password) {
        cy.xpath(PIMLocators.PIM_btnAdd).click()
        cy.get(PIMLocators.PIM_fName).type(firstname)
        cy.get(PIMLocators.PIM_mName).type(middlename)
        cy.get(PIMLocators.PIM_lName).type(lastname)
        cy.xpath(PIMLocators.PIM_EmpId).clear().type(empid)
        cy.xpath(PIMLocators.PIM_btnCreateLoginDetail).click({force: true})
        cy.xpath(PIMLocators.PIM_lblUsrName).type(username)
        cy.xpath(PIMLocators.PIM_lblPassword).type(password)
        cy.xpath(PIMLocators.PIM_lblConfirmPassword).type(password)
        cy.get(PIMLocators.PIM_btnSubmit).click()
    }
    
    verifyEmployeeName (firstName,lastName) {
        cy.location('pathname' ,{ timeout: 10000 }).should('include', EMPLOYEE_PERSONALDETAILS_ENDPOINT);
        cy.xpath(PIMLocators.lblEmpName).should("be.visible").contains(firstName +" "+ lastName)
    }

    searchEmployee (firstName) {
        cy.xpath(PIMLocators.btnEmpList).click()
        cy.location('pathname').should('include', '/pim/viewEmployeeList');
        cy.xpath(PIMLocators.lblSearchEmployee).type(firstName)
        cy.xpath(PIMLocators.btnSearchSubmit).click()
    }

    //verify the added employee data in Employee list page 
    verifyInEmployeeList (data) {
        cy.xpath(PIMLocators.txtEmployeeData(data)).should("exist")
    }

    //Edit job details of employee 
    clickOnEditBtn (empid) { cy.xpath(PIMLocators.btnEditInEmpList(empid)).click() } 
    clickOnJobTab () { cy.xpath(PIMLocators.lblJobTab).click() }
    enterJoinedDate (joineddate) { cy.xpath(PIMLocators.lblJoinDate).clear().type(joineddate) }
    selectJobTitle (jobtitle) {
         cy.xpath(PIMLocators.drpDwnJobTitle).click()
         cy.xpath(PIMLocators.drpDwnOption).contains(jobtitle).click()
    }
    clickOnSave () { cy.xpath(PIMLocators.btnSaveJobDetail).click() }
    
    verifyJoinedDate (joineddate) { cy.xpath(PIMLocators.lblJoinDate).invoke("val").should("eq", joineddate) }
    verifyJobTitle (jobtitle) { cy.xpath(PIMLocators.drpDwnJobTitle).should("have.text", jobtitle) }

    //Delete Employee
    deleteEmployee (empid) { 
        cy.xpath(PIMLocators.btnDeleteEmpList(empid)).click() 
        cy.xpath(PIMLocators.btnConfirmDelete).should("be.visible").click()
        cy.xpath(PIMLocators.txtMsgSuccessfullyDeleted).should("exist")
    }

}

export default PIM;