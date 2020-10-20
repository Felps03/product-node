require('dotenv').load();

const ENV = process.env.NODE_ENV || 'local';

module.exports = {
    loadEnv: () => {
        const env = require(`./properties/${ENV}`);

        return {
            ...env
        };
    }
};
