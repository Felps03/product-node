const { expect } = require('chai');
const UserRouter = require('src/interfaces/http/presentation/user/UserRouter');

describe('Interfaces :: Http :: Presentation :: User :: UserRouter', () => {
    context('when User routes are requested by Router', () => {
        let userRouter, container, arrayWithRoutes;

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
                        create: null
                    },
                    userController:{
                        createUser: null,
                    }
                }
            };
            userRouter = UserRouter({container});
        });

        it('return an array with routes data', async () => {
            expect(userRouter).to.deep.equal(arrayWithRoutes);
        });
    });
});