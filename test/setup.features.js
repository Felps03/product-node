const container = require('src/container');
const configLoader = require('config/configLoader');
const cleanDatabase = require('test/support/cleanDatabase');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiChange = require('chai-change');
const spies = require('chai-spies');
chai.use(spies);
chai.use(dirtyChai);
chai.use(chaiChange);

const config = configLoader.loadLocal();

const instance = container.configureContainer(config);

const providerConnection = instance.resolve('providerConnection');

before(async() => {
    await providerConnection.connect();
    
});

afterEach(async () => cleanDatabase(providerConnection));