const joi = require('joi');

module.exports = ({

    create: joi.object().keys({

        id: joi.number().required(),
        name: joi.string().required(),
        token: joi.string().required()
    }),
});
