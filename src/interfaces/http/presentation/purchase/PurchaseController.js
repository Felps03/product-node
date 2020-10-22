const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createPurchase: AsyncMiddleware(async ctx => {

        const purchase = await opts.createPurchaseOperation.execute(ctx.body);
        const purchaseReady = opts.purchaseSerializer.create(purchase);

        return ctx.res.status(opts.httpConstants.code.OK).json(purchaseReady);
    })
});