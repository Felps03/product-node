const mongoose = require('mongoose');
const connectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    readPreference: 'nearest'
};

class ProviderConnection {
    constructor({ config, logger }) {
        this.config = config;
        this.logger = logger;
        this.connection = null;
        this.url = '';
        this.mongoose = mongoose;
    }

    _getMongoURL(configDB) {
        const { username, password, options, servers, dialect, database } = configDB;
        const userPass = username && password ? `${encodeURIComponent(username)}:${encodeURIComponent(password)}@` : null;
        const url = servers.reduce((prev, cur) => prev + cur + ',', `${dialect}://${userPass}`);
        const urlParsed = `${url.substr(0, url.length - 1)}/${database}`;
        const authSource = `?authSource=${options.authSource}`;
        const replicaSet = options.replicaSet ? '&replicaSet=' + options.replicaSet : '';
        return urlParsed + authSource + replicaSet;
    }

    _getConnOptions(config) {
        const options = config.db.options || {};

        return Object.assign(options, connectionOptions);
    }

    _setEventListeners() {
        this.connection.on('connected', () => this.logger.info('Mongodb connection stablished'));
        this.connection.on('disconnected', () => this.logger.error('Mongodb connection lost'));
        this.connection.on('reconnected', () => this.logger.info('Mongodb successfully reconnected'));
        this.connection.on('reconnectFailed', () => {
            this.logger.error('Mongodb reconnection fail, killing the process');
            process.exit(1);
        });
    }

    async connect() {
        if (this.connection)
            return this.connection;

        const opts = this._getConnOptions(this.config);
        this.url = this._getMongoURL(this.config.db);
        try {
            this.mongoose.pluralize(null);
            this.connection = await this.mongoose.createConnection(this.url, opts );

            this.logger.info('Mongodb connection stablished');
            this._setEventListeners();

            return this.connection;
        } catch (err) {
            this.logger.error('Error on connect Mongodb');

            throw err;
        }
    }
}

module.exports = ProviderConnection;
