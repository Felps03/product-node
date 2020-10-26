const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createProduct: AsyncMiddleware(async ctx => {

        const product = await opts.createProductOperation.execute(ctx.body);
        const productReady = opts.productSerializer.create(product);

        return ctx.res.status(opts.httpConstants.code.CREATED).json(productReady);
    }),

    getProduct: AsyncMiddleware(async ctx => {

        const product = await opts.getProductOperation.execute(ctx.params);

        const productReady = ctx.params.id ?
            opts.productSerializer.getOne(product):
            opts.productSerializer.getAll(product);

        return ctx.res.status(opts.httpConstants.code.OK).json(productReady);
    }),

    searchProduct: AsyncMiddleware(async ctx => {

        const product = await opts.searchProductOperation.execute(ctx.query);
        const productReady = opts.productSerializer.search(product);

        return ctx.res.status(opts.httpConstants.code.OK).json(productReady);

    })

});