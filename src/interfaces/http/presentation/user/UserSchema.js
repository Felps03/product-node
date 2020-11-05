const joi = require('joi').extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({

        name: joi.string().min(5).max(15).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi.string().min(8).max(30).required()
    }),

    authenticate: joi.object().keys({

        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi.string().min(8).max(30).required()
    })
});
