const selenium = require('selenium-webdriver');
const config = require('../../lib/config');

//Runs before all tests and happens in the execution cycle before any spec file is run.
beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = config.JASMINE_TIMEOUT;

    driver = new selenium.Builder()
        .withCapabilities(selenium.Capabilities.chrome())
        .build();
});

//Runs after all tests and happens in the execution cycle after all spec files are finished.
afterAll((done) => {
    driver.quit()
        .then(done);
});