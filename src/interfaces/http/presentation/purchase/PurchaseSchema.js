const joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({
        product: joi.string().required(),
        paymentCondition:{
            inputValue: joi.string().required(),
            numberOfInstallments: joi.string().required()
        }   
    })
});
