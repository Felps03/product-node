const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createPurchase: AsyncMiddleware(async ctx => {
        
        await opts.authMiddleware.execute(ctx.headers.authorization);

        const purchase = await opts.createPurchaseOperation.execute(ctx.body);
        const purchaseReady = opts.purchaseSerializer.create(purchase);

        return ctx.res.status(opts.httpConstants.code.OK).json(purchaseReady);
    })
});