const configLoader = require('config/configLoader');
const container = require('src/container');

class Application {
    constructor() {
        this.container = null;
    }

    async loadSetup() {
        const config = await configLoader.loadEnv();

        this.container = container.configureContainer(config);

        return this;
    }

    async start() {
        const { providerConnection, server } = this.container.cradle;

        await providerConnection.connect();
        await server.start();
    }
}

module.exports = Application;
