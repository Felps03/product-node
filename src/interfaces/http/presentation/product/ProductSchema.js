const joi = require('joi').extend(require('@hapi/joi-date'));
const { PRICES:{ MAX_PRICE, MIN_PRICE }, 
    AMOUNT:{MIN_AMOUNT, MAX_AMOUNT},
    NAME:{MIN_LENGTH, MAX_LENGTH}
} = require('src/domain/services/products/ProductsConstants')();

module.exports = () => ({
    create: joi.object().keys({
        product: {
            name : joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required(),
            valueUnitary: joi.number().min(MIN_PRICE).max(MAX_PRICE).required(),
            amount: joi.number().min(MIN_AMOUNT).max(MAX_AMOUNT).required()
        }   
    }),
    params: joi.object().keys({
        id: joi.string()
    }),
    query: joi.object().keys({
        max_price: joi.number().min(MIN_AMOUNT).max(MAX_AMOUNT),
        min_price: joi.number().min(MIN_AMOUNT).max(MAX_AMOUNT)
    })
});
   