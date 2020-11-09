const jwt = require('jsonwebtoken');

module.exports = ({ config }) => ({

    generate: (params = {}) => {
        return jwt.sign(params, process.env.TOKEN_SECRET || config.auth.secret, { expiresIn: 86400 });
    },

    validate: (token) => {

        return jwt.verify(token, process.env.TOKEN_SECRET || config.auth.secret, (err) => { if (!err) return true; });

    }
});


