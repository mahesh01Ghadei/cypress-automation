declare namespace Cypress {

  /*declare module 'cypress-mochawesome-reporter/plugin.js' {
    const plugin: (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => void;
    export = plugin;
  }

  declare module '@cypress/grep/src/plugin.js' {
    const plugin: (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => void;
    export = plugin;
  }*/

  interface Chainable<Subject = any> {
    login(): Chainable<void>;
  }

}
