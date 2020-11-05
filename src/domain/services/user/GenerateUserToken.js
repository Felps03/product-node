const jwt = require('jsonwebtoken');

module.exports = ({ config }) => ({

    generate: (params = {}) => {
        return jwt.sign(params, config.auth.secret, { expiresIn: 86400 });
    },

    validate: (token) => {

        return jwt.verify(token, config.auth.secret, (err) => { if (!err) return true; });
                
    }
});


