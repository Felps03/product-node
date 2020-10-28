require('dotenv').load();

const ENV = 'test' || process.env.NODE_ENV  ;

module.exports = {
    loadEnv: () => {
        const env = require(`./properties/${ENV}`);

        return {
            ...env
        };
    }
};
