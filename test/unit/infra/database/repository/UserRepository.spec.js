const { expect, spy } = require('chai');
const UserRepository = require('src/infra/database/repository/UserRepository');


describe('Infra :: Database :: Repository :: UserRepository', () => {
    let userRequested, userFromDatabase, userRepository, userModel;
    
    context('When user is created with success', () => {

        beforeEach(() => {
            userFromDatabase = {
                id: 1,
                _id: 'someRandomMongodbId',
                name: 'Linus',
                email: 'Linus.Torvalds@linux.com',
                password: 'somehashedpassword',
                createAt: '2020-11-04T19:26:23.728Z',
                updateAt: '2020-11-04T19:26:23.729Z',
            };

            userModel = {
                create: () => Promise.resolve(userFromDatabase)
            };

            userRequested = {
                name: 'Linus',
                email: 'Linus.Torvalds@linux.com',
                password: 'somePasswordNotHashed'
            };

            spy.on(userModel, 'create');
            userRepository = new UserRepository({ userModel });
        });

        it(' returns full user data from database', async () => {

            const response = await userRepository.create(userRequested);
            expect(userModel.create).to.be.called.once.with.exactly(userRequested);
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
                password: 'somehashedpassword',
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

            userModel = {
                create: () => Promise.reject(new Error('test'))
            };

            userRepository = new UserRepository({ userModel });
            spy.on(userModel, 'create');
        });

        it('throws an error', done => {

            userRepository
                .create(userRequested)
                .then(() => done('Must be an error'))
                .catch(error => {
                    expect(error).to.be.exist();
                    expect(error.message).to.be.eql('test');
                    expect(userModel.create).to.be.called.once();
                    done();
                });
        });
    });
}); 