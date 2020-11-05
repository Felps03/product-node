const { expect } = require('chai');
const AuthenticateUserRouter = require('src/interfaces/http/presentation/user/AuthenticateUserRouter');

describe('Interfaces :: Http :: Presentation :: User :: AuthenticateUserRouter', () => {
    context('when User Authentication routes are requested by Router', () => {
        let authenticateUserRouter, container, arrayWithRoutes;

        before(() => {

            arrayWithRoutes = [
                {
                    method: 'post',
                    path: '/',
                    validation: { body: null },
                    handler: null
                }
            ];
            container = {
                cradle: {
                    userSchema:{
                        authenticate: null
                    },
                    userController:{
                        authenticateUser: null,
                    }
                }
            };
            authenticateUserRouter = AuthenticateUserRouter({container});
        });

        it('return an array with routes data', async () => {
            expect(authenticateUserRouter).to.deep.equal(arrayWithRoutes);
        });
    });
});