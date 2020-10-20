const axios = require('axios');
const HttpConstants = require('src/interfaces/http/presentation/constants/HttpConstants')();

class CepClient {
    constructor({ logger, config, exception }) {
        this.logger = logger;
        this.exception = exception;
        this._client = axios.create({
            baseURL: config.integration.rest.cepClientMs.baseUrl,
            timeout: config.integration.rest.cepClientMs.timeout,
            rejectUnauthorized: config.integration.rest.cepClientMs.rejectUnauthorized
        });
    }

    async get(cep) {
        const response = await this._client({
            method: 'get',
            url: `/ws/${cep}/json`
        });

        const url = response._currentUrl ? response._currentUrl : Object.values(response.config)[0];
        this.logger.info(`cepClient - get - Calling end point [GET] ${url}`);

        this.verifyService(response.status, url);

        return response.data;
    }

    verifyService(status, url) {
        if (HttpConstants.code.SERVICE_UNAVAILABLE == status) {
            throw this.exception.serviceUnavailable('serviceUnavailable', 'SERVICE_UNAVAILABLE', [url]);
        }
    }
}

module.exports = CepClient;
