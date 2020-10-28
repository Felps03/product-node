const request = require('supertest');
const configLoader = require('config/configLoader');
const container = require('src/container');
const config = configLoader.loadEnv();
container.configureContainer(config);
const server = container.container.resolve('server');

module.exports = () => request(server.express);