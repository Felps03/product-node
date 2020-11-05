const { expect, spy } = require('chai');
const UserController = require('src/interfaces/http/presentation/user/UserController');

describe('Interfaces :: Http :: Presentation :: User :: UserController', () => {

    describe('#createUser', () => {

        context('when an user was created successfully', () => {

            let userController, ctx, opts, userSerialized, userFromDatabaseWithToken;

            before(() => {

                userSerialized = {
                    id: 1,
                    name: 'Linus',
                    token: 'RandomFakeToken'
                };

                userFromDatabaseWithToken = {
                    userReturned: {
                        id: 1,
                        name: 'Linus',
                        email: 'Linus.Torvalds@linux.com',
                        password: 'somehashedpassword'
                    },
                    token: 'RandomFakeToken'
                };

                opts = {
                    createUserOperation: {
                        execute: () => Promise.resolve(userFromDatabaseWithToken)
                    },
                    userSerializer: {
                        create: () => (userSerialized)
                    },
                    httpConstants: {
                        code: ({
                            CREATED: 'created'
                        })
                    },
                };

                ctx = {
                    body: {
                        name: 'Linus',
                        email: 'Linus.Torvalds@linux.com'
                    },
                    res: {
                        status: () => ({
                            json: () => (userSerialized)
                        })
                    },
                };

                userController = UserController(opts);

                spy.on(opts.createUserOperation, 'execute');
                spy.on(opts.userSerializer, 'create');
                spy.on(ctx.res, 'status');
            });

            it(' returns user name, id and token ', async () => {

                const response = await userController.createUser(ctx);
                expect(opts.createUserOperation.execute).to.have.been.called.once.with.exactly(ctx.body);
                expect(opts.userSerializer.create).to.have.been.called.once.with.exactly(userFromDatabaseWithToken);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('created');
                expect(response).to.deep.equal(userSerialized);

            });
        });

        context('when an user was authenticated successfully', () => {

            let userController, ctx, opts, userSerialized, userFromDatabaseWithToken;

            before(() => {

                userSerialized = {

                    name: 'Linus',
                    token: 'RandomFakeToken'
                };

                userFromDatabaseWithToken = {
                    userReturned: {
                        id: 1,
                        name: 'Linus',
                        email: 'Linus.Torvalds@linux.com',
                        password: 'somehashedpassword'
                    },
                    token: 'RandomFakeToken'
                };

                opts = {
                    authenticateUserOperation: {
                        execute: () => Promise.resolve(userFromDatabaseWithToken)
                    },
                    userSerializer: {
                        authenticate: () => (userSerialized)
                    },
                    httpConstants: {
                        code: ({
                            OK: 'ok'
                        })
                    },
                };

                ctx = {
                    body: {
                        email: 'Linus.Torvalds@linux.com',
                        password: 'SomePasswordNotHashed'
                    },
                    res: {
                        status: () => ({
                            json: () => (userSerialized)
                        })
                    },
                };

                userController = UserController(opts);

                spy.on(opts.authenticateUserOperation, 'execute');
                spy.on(opts.userSerializer, 'authenticate');
                spy.on(ctx.res, 'status');
            });

            it(' returns user name and token ', async () => {

                const response = await userController.authenticateUser(ctx);
                expect(opts.authenticateUserOperation.execute).to.have.been.called.once.with.exactly(ctx.body);
                expect(opts.userSerializer.authenticate).to.have.been.called.once.with.exactly(userFromDatabaseWithToken);
                expect(ctx.res.status).to.have.been.called.once.with.exactly('ok');
                expect(response).to.deep.equal(userSerialized);

            });
        });


        context('when occurs error', () => {

            let userController, ctx, opts;

            before(() => {
                opts = {
                    createUserOperation: {
                        execute: () => Promise.reject({ error_code: 'test' })
                    },
                };

                ctx = {
                    body: {
                        name: 'Linus',
                        email: 'Linus.Torvalds@linux.com',
                        password: 'SomePasswordNotHashed'
                    },
                    res: {
                        status: () => ({
                            json: () => ({})
                        })
                    },
                };

                userController = UserController(opts);

                spy.on(opts.createUserOperation, 'execute');

            });

            it(' returns error ', done => {

                userController
                    .createUser(ctx)
                    .then(() => done('Must be an error'))
                    .catch((error => {
                        expect(opts.createUserOperation.execute).to.have.been.called.once();
                        expect(error.error_code).to.be.eql('test');                       
                        expect(error).to.be.exist();
                        done();
                    }));
            });
        });
    });
});    
