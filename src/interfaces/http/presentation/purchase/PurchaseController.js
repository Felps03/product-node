const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createPurchase: AsyncMiddleware(async ctx => {
        //const response = await opts.createProductOperation.execute(ctx.body);
        return ctx.res.status(opts.httpConstants.code.OK).json(ctx.body);

    })
});