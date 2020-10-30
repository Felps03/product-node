require('dotenv').load();

const ENV =  process.env.NODE_ENV || 'test' ;

module.exports = {
    loadEnv: () => {
        const env = require(`./properties/${ENV}`);

        return {
            ...env
        };
    }
};
