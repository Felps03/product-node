const express = require('express');
const http = require('http');
const { scopePerRequest } = require('awilix-express');

class Server {
    constructor({ config, router, logger, container }) {
        this.config = config;
        this.logger = logger;
        this.express = express();
        this.express.use(scopePerRequest(container));
        this.express.use(router);
    }

    start() {
        return new Promise(resolve => {
            const server = http.createServer(this.express)
                .listen(this.config.web.port, () => {
                    const { port } = server.address();
                    this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
                    resolve();
                });
        });
    }
}

module.exports = Server;
