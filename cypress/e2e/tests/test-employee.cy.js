import PIMPage from "../pages/PIM";
import { testcase } from '../../support/testcase';

describe("Employee creation, details updation and deletion", () => {

    const PIM = new PIMPage();
    beforeEach(() => {
        cy.fixture('user').as('adminData')
        cy.fixture('employee').as('empData')
    })

    testcase({id: 'TCID-201', tags: ['regression'] } , function () {
        it("should add a new employee", function () {
            cy.login(this.adminData.validuser.username,this.adminData.validuser.password)
            PIM.clickOnPIMMenuItem()
            PIM.verifyPIMUrl()
            PIM.addEmployee(
                this.empData.employee1.firstname,
                this.empData.employee1.middlename,
                this.empData.employee1.lastname,
                this.empData.employee1.empid,
                this.empData.employee1.username,
                this.empData.employee1.password
            )
            PIM.verifyEmployeeName(
                this.empData.employee1.firstname,
                this.empData.employee1.lastname
            )
            PIM.searchEmployee(this.empData.employee1.firstname)
            PIM.verifyInEmployeeList(this.empData.employee1.firstname)
        })
    })

    testcase({id: 'TCID-202', tags: ['regression'] } , function () {
        it("should edit employee details", function () {
            cy.login(this.adminData.validuser.username,this.adminData.validuser.password)
            PIM.clickOnPIMMenuItem()
            PIM.verifyPIMUrl()
            PIM.searchEmployee(this.empData.employee1.firstname)
            PIM.verifyInEmployeeList(this.empData.employee1.firstname)
            PIM.clickOnEditBtn(this.empData.employee1.empid)
            PIM.clickOnJobTab()
            PIM.enterJoinedDate(this.empData.jobDetails.joineddate)
            PIM.selectJobTitle(this.empData.jobDetails.jobtitle)
            PIM.clickOnSave()
            PIM.verifyJoinedDate(this.empData.jobDetails.joineddate)
            PIM.verifyJobTitle(this.empData.jobDetails.jobtitle)
            PIM.searchEmployee(this.empData.employee1.firstname)
            PIM.verifyInEmployeeList(this.empData.jobDetails.jobtitle)
        })
    })

    testcase({id: 'TCID-203', tags: ['regression'] } , function () {

        it("should delete a single employee" , function ()  {
            cy.login(this.adminData.validuser.username,this.adminData.validuser.password)
            PIM.clickOnPIMMenuItem()
            PIM.verifyPIMUrl()
            PIM.searchEmployee(this.empData.employee1.firstname)
            PIM.verifyInEmployeeList(this.empData.employee1.empid)
            PIM.deleteEmployee(this.empData.employee1.empid)
        })
        
    })

})