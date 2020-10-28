const joi = require('joi').extend(require('@hapi/joi-date'));
const { MAX_INSTALLMENTS } = require('src/domain/services/purchase/PurchaseConstants')();
const { PRICES:{ MAX_PRICE, MIN_PRICE }} = require('src/domain/services/products/ProductsConstants')();

module.exports = () => ({
    create: joi.object().keys({
        product: joi.number().min(1).required(),
        paymentCondition: {
            inputValue: joi.number().min(MIN_PRICE).max(MAX_PRICE).required(),
            numberOfInstallments: joi.number().max(MAX_INSTALLMENTS).required()
        }
    })
});
