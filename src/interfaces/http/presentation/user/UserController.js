const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createUser: AsyncMiddleware(async ctx => {

        const userData = await opts.createUserOperation.execute(ctx.body);
        const userReady = opts.userSerializer.create(userData);

        return ctx.res.status(opts.httpConstants.code.CREATED).json(userReady);
    }),
    authenticateUser: AsyncMiddleware(async ctx => {

        const userData = await opts.authenticateUserOperation.execute(ctx.body);
        const token = opts.userSerializer.authenticate(userData);

        return ctx.res.status(opts.httpConstants.code.OK).json(token);
    })
});