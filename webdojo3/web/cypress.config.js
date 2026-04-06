const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // In cypress, go to the settings tab, project settings, and use visualize the spec patterns and experimentals
    experimentalStudio: true,
  },
});
