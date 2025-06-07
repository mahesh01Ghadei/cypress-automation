import { defineConfig } from 'cypress';
import mochawesome from 'cypress-mochawesome-reporter/plugin.js';
import grep from '@cypress/grep/src/plugin.js';

export default defineConfig({

  downloadsFolder: 'cypress/downloads',
  fixturesFolder: 'cypress/fixtures',

  screenshotsFolder: 'cypress/screenshots',
  screenshotOnRunFailure: true,

  video: false,
  videosFolder: 'cypress/videos',
  videoCompression: 0,

  viewportHeight: 800,
  viewportWidth: 1200,

  defaultCommandTimeout: 5000,

  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },

  retries: {
    runMode: 0,
    openMode: 0,
  },

  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on);
      grep(on, config);
      return config;
    },
  },

  env: {
    BASE_URL: 'https://opensource-demo.orangehrmlive.com',
    grepFilterSpecs: true,
  },

});
