import './commands'
import 'cypress-mochawesome-reporter/register';
require ('cypress-xpath')

const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()
