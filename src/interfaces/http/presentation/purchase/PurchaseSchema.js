const joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({
        product: joi.number().required(),
        paymentCondition:{
            inputValue: joi.number().required(),
            numberOfInstallments: joi.number().required()
        }   
    })
});
