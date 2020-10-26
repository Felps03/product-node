const joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({
        product: {
            name : joi.string().required(),
            valueUnitary: joi.number().min(1).required(),
            amount: joi.number().required().min(1)
        }   
    }),
    params: joi.object().keys({
        id: joi.string()
    }),
    query: joi.object().keys({
        max_price: joi.number(),
        min_price: joi.number()
    })
});
   