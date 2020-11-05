const joi = require('joi');

module.exports = ({

    authenticate: joi.object().keys({

        name: joi.string().required(),
        token: joi.string().required()
    }),
});
