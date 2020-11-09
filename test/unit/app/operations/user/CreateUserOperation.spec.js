const { expect, spy } = require('chai');
const CreateUserOperation = require('src/app/operations/user/CreateUserOperation');

describe('App :: Operations :: User :: CreateUserOperation', () => {

    describe('#execute', () => {
        context('when user was created with success', () => {

            let createUserOperation, userRepository, userFromDatabase, userToBeCreated, generateUserToken, logger, userCreatedWithToken;

            before(() => {
                userFromDatabase = {
                    id: 1,
                    _id: 'someRandomMongodbId',
                    name: 'Linus',
                    email: 'Linus.Torvalds@linux.com',
                    password: 'somehashedpassword',
                    createAt: '2020-11-04T19:26:23.728Z',
                    updateAt: '2020-11-04T19:26:23.729Z',
                };

                userToBeCreated = {
                    name: 'Linus',
                    email: 'Linus.Torvalds@linux.com',
                    password: 'somePasswordNotHashed'
                };

                userCreatedWithToken = {
                    userReturned: {
                        id: 1,
                        _id: 'someRandomMongodbId',
                        name: 'Linus',
                        email: 'Linus.Torvalds@linux.com',
                        password: 'somehashedpassword',
                        createAt: '2020-11-04T19:26:23.728Z',
                        updateAt: '2020-11-04T19:26:23.729Z',
                    }, token: 'validTokenCreated'
                };


                userRepository = {
                    create: () => Promise.resolve(userFromDatabase)
                };

                generateUserToken = {
                    generate: () => 'validTokenCreated'
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };
                createUserOperation = new CreateUserOperation({ userRepository, logger, generateUserToken });
                spy.on(userRepository, 'create');
                spy.on(generateUserToken, 'generate');
            });

            it('returns created user', async () => {
                const response = await createUserOperation.execute(userToBeCreated);
                expect(response).to.be.deep.equal(userCreatedWithToken);
                expect(userRepository.create).to.be.called.once.with.exactly(userToBeCreated);
                expect(generateUserToken.generate).to.be.called.once.with.exactly({id:userFromDatabase.id});
            });
        });

        context('when occurs error email already used', () => {

            let userRepository, createUserOperation, logger, exception;

            before(() => {
                userRepository = {
                    create: () => Promise.reject({code: 11000})
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };

                exception = {
                    badRequest: () => { throw new Error('E-mail already used'); }
                }

                createUserOperation = new CreateUserOperation({ userRepository, logger, exception });
                
                spy.on(userRepository, 'create');
                spy.on(logger, 'error');
                spy.on(exception, 'badRequest');
            });

            it('throws error', done => {
                createUserOperation
                    .execute({})
                    .then(done => done('Must be an error'))
                    .catch(error => {

                        expect(logger.error).to.have.been.called.once();
                        expect(exception.badRequest).to.have.been.called.once.with.exactly('E-mail already used');
                        expect(error.message).to.be.eql('E-mail already used');
                        expect(error).to.be.exist();
                        done();
                    });
            });
        });

        context('when occurs error', () => {

            let userRepository, createUserOperation, logger;

            before(() => {
                userRepository = {
                    create: () => Promise.reject(new Error('test'))
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };

                createUserOperation = new CreateUserOperation({ userRepository, logger });
                spy.on(userRepository, 'create');
                spy.on(logger, 'error');
            });

            it('throws error', done => {
                createUserOperation
                    .execute({})
                    .then(done => done('Must be an error'))
                    .catch(error => {
                        expect(logger.error).to.have.been.called.once();
                        expect(error.message).to.be.eql('test');
                        expect(error).to.be.exist();
                        done();
                    });
            });
        });
    });
});