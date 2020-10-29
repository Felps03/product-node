const container = require('src/container');
const configLoader = require('config/configLoader');
const cleanDatabase = require('test/support/cleanDatabase');
const chai = require('chai');
chai.use(require('chai-spies'));
chai.use(require('dirty-chai'));
chai.use(require('chai-change'));

const config = configLoader.loadEnv();

const instance = container.configureContainer(config);

const providerConnection = instance.resolve('providerConnection');

before(async () => {
    await providerConnection.connect();

});

afterEach(async () => cleanDatabase(providerConnection));