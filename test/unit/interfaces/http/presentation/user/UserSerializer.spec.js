const { expect } = require('chai');
const UserSerializer = require('src/interfaces/http/presentation/user/UserSerializer');

describe('Interfaces :: Http :: Presentation :: User :: UserSerializer', () => {
    describe('#serializeUser', () => {

        context('when serialize a created user', () => {

            let userSerializer, UserSerialized, UserFromDatabaseWithToken;

            before(() => {

                UserSerialized = {
                    id: 1,
                    name: 'Linus',
                    token: 'RandomFakeToken'
                };

                UserFromDatabaseWithToken = {
                    userReturned: {
                        id: 1,
                        name: 'Linus',
                        email: 'Linus.Torvalds@linux.com',
                        password: 'somehashedpassword'
                    },
                    token: 'RandomFakeToken'
                };

                userSerializer = UserSerializer();
            });

            it('returns user name, id and token ', () => {

                const response = userSerializer.create(UserFromDatabaseWithToken);
                expect(response).to.deep.equal(UserSerialized);

            });
        });

        context('when serialize a authenticated user', () => {

            let userSerializer, UserSerialized, UserFromDatabaseWithToken;

            before(() => {

                UserSerialized = {

                    name: 'Linus',
                    token: 'RandomFakeToken'
                };

                UserFromDatabaseWithToken = {
                    userReturned: {
                        id: 1,
                        name: 'Linus',
                        email: 'Linus.Torvalds@linux.com',
                        password: 'somehashedpassword'
                    },
                    token: 'RandomFakeToken'
                };

                userSerializer = UserSerializer();
            });

            it('returns user name and token ', () => {

                const response = userSerializer.authenticate(UserFromDatabaseWithToken);
                expect(response).to.deep.equal(UserSerialized);

            });
        });
    });
});