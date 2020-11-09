const { expect, spy } = require('chai');
const AuthenticateUserOperation = require('src/app/operations/user/AuthenticateUserOperation');


describe('App :: Operations :: User :: AuthenticateUserOperation', () => {

    describe('#execute', () => {
        context('when user was authenticated with success', async () => {

            let passwordHashed, 
                authenticateUserOperation, 
                userRepository, 
                userFromDatabase, 
                userToBeAuthenticated, 
                generateUserToken, 
                generateHash,
                userCreatedWithToken,
                logger;

            before(async () => {

                userToBeAuthenticated = {
                    email: 'Linus.Torvalds@linux.com',
                    password: 'somePasswordNotHashed'
                };

                userFromDatabase = {
                    id: 1,
                    _id: 'someRandomMongodbId',
                    name: 'Linus',
                    email: 'Linus.Torvalds@linux.com',
                    password: 'passwordHashed',
                    createAt: '2020-11-04T19:26:23.728Z',
                    updateAt: '2020-11-04T19:26:23.729Z',
                };

                userCreatedWithToken = {
                    userReturned: {
                        id: 1,
                        _id: 'someRandomMongodbId',
                        name: 'Linus',
                        email: 'Linus.Torvalds@linux.com',
                        password: 'passwordHashed',
                        createAt: '2020-11-04T19:26:23.728Z',
                        updateAt: '2020-11-04T19:26:23.729Z',
                    }, token: 'validTokenCreated'
                };

                generateHash = {
                    validate: () => Promise.resolve(true)
                }
                userRepository = {
                    authenticate: () => Promise.resolve(userFromDatabase)
                };

                generateUserToken = {
                    generate: () => 'validTokenCreated'
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };
                authenticateUserOperation = new AuthenticateUserOperation({ userRepository, logger, generateUserToken, generateHash });
                spy.on(userRepository, 'authenticate');
                spy.on(generateUserToken, 'generate');
                spy.on(generateHash, 'validate')
            });

            it('returns authenticated user', async () => {
                const response = await authenticateUserOperation.execute(userToBeAuthenticated);
                expect(response).to.be.deep.equal(userCreatedWithToken);
                expect(userRepository.authenticate).to.be.called.once.with.exactly(userToBeAuthenticated.email);
                expect(generateUserToken.generate).to.be.called.once.with.exactly({id:userFromDatabase.id});
                expect(generateHash.validate).to.be.called.once.with.exactly(userToBeAuthenticated.password, userFromDatabase.password);
            });
        });

        context('when occurs error', () => {

            let userRepository, authenticateUserOperation, logger, userToBeAuthenticated;

            before(() => {
                
                userToBeAuthenticated = {
                    email: 'Linus.Torvalds@linux.com',
                    password: 'somePasswordNotHashed'
                };

                userRepository = {
                    authenticate: () => Promise.reject(new Error('test'))
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };

                authenticateUserOperation = new AuthenticateUserOperation({ userRepository, logger });
                spy.on(userRepository, 'create');
                spy.on(logger, 'error');
            });

            it('throws error', done => {
                authenticateUserOperation
                    .execute(userToBeAuthenticated)
                    .then(done => done('Must be an error'))
                    .catch(error => {
                        expect(error.message).to.be.eql('test');
                        expect(logger.error).to.have.been.called.once();
                        expect(error).to.be.exist();
                        done();
                    });
            });
        });
    });
});