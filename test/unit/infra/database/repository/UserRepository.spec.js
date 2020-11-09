const { expect, spy } = require('chai');
const UserRepository = require('src/infra/database/repository/UserRepository');
const { generate } = require('../../../../../../../../AppData/Local/Microsoft/TypeScript/4.0/node_modules/rxjs/index');


describe('Infra :: Database :: Repository :: UserRepository', () => {
    let userRequested, userFromDatabase, userRepository, userModel, generateHash;
    
    context('When user is created with success', () => {

        beforeEach(() => {
            userFromDatabase = {
                id: 1,
                _id: 'someRandomMongodbId',
                name: 'Linus',
                email: 'Linus.Torvalds@linux.com',
                password: 'someHashedPassword',
                createAt: '2020-11-04T19:26:23.728Z',
                updateAt: '2020-11-04T19:26:23.729Z',
            };

            userModel = {
                create: () => Promise.resolve(userFromDatabase)
            };

            generateHash = {
                generate: () => Promise.resolve('someHashedPassword')
            };

            userRequested = {
                name: 'Linus',
                email: 'Linus.Torvalds@linux.com',
                password: 'somePasswordNotHashed'
            };

            spy.on(userModel, 'create');
            spy.on(generateHash, 'generate');
            userRepository = new UserRepository({ userModel, generateHash });
        });

        it(' returns full user data from database', async () => {

            const response = await userRepository.create(userRequested);
            expect(userModel.create).to.be.called.once.with.exactly(userRequested);
            expect(generateHash.generate).to.be.called.once.with.exactly('somePasswordNotHashed');
            expect(response).to.deep.equal(userFromDatabase);
        });
    });


    context('When user is authenticated with success', () => {

        beforeEach(() => {
            userFromDatabase = {
                id: 1,
                _id: 'someRandomMongodbId',
                name: 'Linus',
                email: 'Linus.Torvalds@linux.com',
                password: 'someHashedPassword',
                createAt: '2020-11-04T19:26:23.728Z',
                updateAt: '2020-11-04T19:26:23.729Z',
            };

            userModel = {
                findOne: () => Promise.resolve(userFromDatabase)
            };

            userRequested = {
                email: 'Linus.Torvalds@linux.com',
            };

            spy.on(userModel, 'findOne');
            userRepository = new UserRepository({ userModel });
        });

        it(' returns full user data from database', async () => {

            const response = await userRepository.authenticate(userRequested.email);
            expect(userModel.findOne).to.be.called.once.with.exactly({email:userRequested.email});
            expect(response).to.deep.equal(userFromDatabase);
        });
    });



    context('when ocucurs an error', () => {
        let userRepository, userModel, userRequested;
        before(() => {
            
            userRequested = {
                name: 'Linus',
                email: 'Linus.Torvalds@linux.com',
                password: 'somePasswordNotHashed'
            };

            generateHash = {
                generate: () => Promise.resolve('someHashedPassword')
            };

            userModel = {
                create: () => Promise.reject(new Error('test'))
            };

            userRepository = new UserRepository({ userModel, generateHash });
            spy.on(userModel, 'create');
            spy.on(generateHash, 'generate');

        });

        it('throws an error', done => {

            userRepository
                .create(userRequested)
                .then(() => done('Must be an error'))
                .catch(error => {
                    expect(error).to.be.exist();
                    expect(error.message).to.be.eql('test');
                    expect(userModel.create).to.be.called.once();
                    expect(generateHash.generate).to.be.called.once();
                    done();
                });
        });
    });
}); 