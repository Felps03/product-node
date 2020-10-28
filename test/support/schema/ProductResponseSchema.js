const joi = require('joi');
const { PRICES: { MAX_PRICE, MIN_PRICE },
    AMOUNT: { MIN_AMOUNT, MAX_AMOUNT },
    NAME: { MIN_LENGTH, MAX_LENGTH }
} = require('src/domain/services/products/ProductsConstants')();


module.exports = ({

    create: joi.object().keys({

        id: joi.number().required(),
        name: joi.string().required(),
        status: joi.string().required()
    }),

    get: joi.array().items(joi.object().keys({

        id: joi.number().min(1),
        name: joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required(),
        valueUnitary: joi.number().min(MIN_PRICE).max(MAX_PRICE).required(),
        amount: joi.number().min(MIN_AMOUNT).max(MAX_AMOUNT).required(),
        lasPriceSold: joi.forbidden(),
        lastTimeSold: joi.forbidden()
    })),

    getWithId: joi.array().items(joi.object().keys({

        id: joi.number().min(1),
        name: joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required(),
        valueUnitary: joi.number().min(MIN_PRICE).max(MAX_PRICE).required(),
        amount: joi.number().min(MIN_AMOUNT).max(MAX_AMOUNT).required(),
        lastPriceSold: joi.number().allow(null),
        lastTimeSold: joi.string().allow(null)
    })),

    search: joi.array().items(joi.object().keys({

        id: joi.number().min(1),
        name: joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required(),
        valueUnitary: joi.number().min(100).max(200).required(),
        amount: joi.number().min(MIN_AMOUNT).max(MAX_AMOUNT).required(),
        lasPriceSold: joi.forbidden(),
        lastTimeSold: joi.forbidden()
    })),
});