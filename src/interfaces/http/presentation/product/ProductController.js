const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createProduct: AsyncMiddleware(async ctx => {
        //const response = await opts.createProductOperation.execute(ctx.body);
        return ctx.res.status(opts.httpConstants.code.CREATED).json(ctx.body);

    })
});