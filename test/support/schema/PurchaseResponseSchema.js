const joi = require('joi');
const { PRICES: { MAX_PRICE, MIN_PRICE } } = require('src/domain/services/products/ProductsConstants')();
const { MAX_INSTALLMENTS, TAXES: { SELIC: { START_INSTALLMENTS, PERCENT } } } = require('src/domain/services/purchase/PurchaseConstants')();


module.exports = ({

    create: joi.array().items(joi.object().keys({

        value: joi.number().min(MIN_PRICE).max(MAX_PRICE).required(),
        numberOfInstallment: joi.number().max(MAX_INSTALLMENTS).required(),
        monthlyInterestRate: joi.forbidden()
    })),

    createWithTaxes: joi.array().items(joi.object().keys({

        value: joi.number().min(MIN_PRICE).max(MAX_PRICE).required(),
        numberOfInstallment: joi.number().max(MAX_INSTALLMENTS).required(),
        monthlyInterestRate: joi.string().valid(PERCENT).required()
    })).length(START_INSTALLMENTS)
});