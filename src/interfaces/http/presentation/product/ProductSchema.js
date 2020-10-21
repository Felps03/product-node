const joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({
        product: {
            name : joi.string().required(),
            valueUnitary: joi.string().required(),
            amount: joi.string().required()
        }   
    })
});
   