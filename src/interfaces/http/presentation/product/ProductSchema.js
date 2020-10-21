const joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({
        product: {
            name : joi.string().required(),
            valueUnitary: joi.string().required(),
            amount: joi.string().required()
        }   
    }),
    params: joi.object().keys({
        id: joi.string()
    }),
    query: joi.object().keys({
        max_price: joi.string(),
        min_price: joi.string()
    })
});
   