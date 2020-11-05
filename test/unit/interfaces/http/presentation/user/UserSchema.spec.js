const { expect } = require('chai');
const UserSchema = require('src/interfaces/http/presentation/user/UserSchema');

describe('Interfaces :: Http :: Presentation :: user :: userSchema', () => {
    context('when user schema validation is requested by middleware', () => {
        let userSchema;

        before(() => {
            userSchema = UserSchema();
        });

        it('return object with joi validations', async () => {

            expect(userSchema).to.haveOwnProperty('create');
            expect(userSchema).to.haveOwnProperty('authenticate');
        });
    });
});