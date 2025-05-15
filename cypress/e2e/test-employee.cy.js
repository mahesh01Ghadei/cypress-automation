import { PIM } from "../support/pageObjects/PIM";

describe("Employee creation, details updation and deletion", () => {

    let adminData,empData;

    beforeEach(() => {
        cy.fixture('user').then((userdata) => {
            adminData = userdata
        })
        cy.fixture('employee').then((employeedata) => {
            empData = employeedata
        })
        cy.then(() => {
            cy.login(adminData.validuser.username,adminData.validuser.password)
        })
    })

    it("Add new employee", () =>{
        PIM.clickOnPIMMenuItem()
        PIM.verifyPIMUrl()
        PIM.addEmployee(
            empData.employee1.firstname,
            empData.employee1.middlename,
            empData.employee1.lastname,
            empData.employee1.empid,
            empData.employee1.username,
            empData.employee1.password
        )
        PIM.verifyEmployeeName(
            empData.employee1.firstname,
            empData.employee1.lastname
        )
        PIM.searchEmployee(empData.employee1.firstname)
        PIM.verifyInEmployeeList(empData.employee1.firstname)
    })

    it("Edit Employee details", () =>{
        PIM.clickOnPIMMenuItem()
        PIM.verifyPIMUrl()
        PIM.searchEmployee(empData.employee1.firstname)
        PIM.verifyInEmployeeList(empData.employee1.firstname)
        PIM.clickOnEditBtn(empData.employee1.empid)
        PIM.clickOnJobTab()
        PIM.enterJoinedDate(empData.jobDetails.joineddate)
        PIM.selectJobTitle(empData.jobDetails.jobtitle)
        PIM.clickOnSave()
        PIM.verifyJoinedDate(empData.jobDetails.joineddate)
        PIM.verifyJobTitle(empData.jobDetails.jobtitle)
        PIM.searchEmployee(empData.employee1.firstname)
        PIM.verifyInEmployeeList(empData.jobDetails.jobtitle)
    })

    it("Delete a single employee" , () => {
        PIM.clickOnPIMMenuItem()
        PIM.verifyPIMUrl()
        PIM.searchEmployee(empData.employee1.firstname)
        PIM.verifyInEmployeeList(empData.employee1.empid)
        PIM.deleteEmployee(empData.employee1.empid)
    })

})