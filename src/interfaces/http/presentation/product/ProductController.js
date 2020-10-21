const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createProduct: AsyncMiddleware(async ctx => {
        //const response = await opts.createProductOperation.execute(ctx.body);
        return ctx.res.status(opts.httpConstants.code.CREATED).json(ctx.body);

    }),

    getProduct: AsyncMiddleware(async ctx => {
        //const response = await opts.createProductOperation.execute(ctx.body);
        console.log('getProduct')
        return ctx.res.status(opts.httpConstants.code.OK).json(ctx.params);

    }),
    searchProduct: AsyncMiddleware(async ctx => {
        //const response = await opts.createProductOperation.execute(ctx.body);
        console.log('searchProduct')
        return ctx.res.status(opts.httpConstants.code.OK).json(ctx.query);
        
    })

});