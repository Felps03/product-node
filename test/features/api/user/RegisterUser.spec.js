const { expect } = require('chai');
const registerUserResponseSchema = require('test/support/schema/RegisterUserResponseSchema');
const request = require('test/support/request');

describe('API :: POST /api/register', () => {

    context('Register user with success', async () => {
        let bodyRegisterUser;

        beforeEach(async () => {
            bodyRegisterUser = {
                name: 'Linus Torvalds',
                email: 'Linus.Torvalds@linux.com',
                password: 'somerandompassword'
            };

        });

        it('create a user and return a valid token', async () => {
            const { body } = await request()
                .post('/api/register')
                .send(bodyRegisterUser)
                .expect(201);

            const { error } = registerUserResponseSchema.create.validate(body);
            expect(error).to.be.not.exist();
        });
    });

    context('Try to register a user without name, email and password', async () => {
        let bodyRegisterUser;
        beforeEach(async () => bodyRegisterUser = {});
        it('returns bad request error', async () => {
            const { body } = await request()
                .post('/api/register')
                .send(bodyRegisterUser)
                .expect(400);

            expect(body.message).to.be.eql('Bad Request');

            const errorMessages = [
                '"name" is required',
                '"email" is required',
                '"password" is required'
            ];

            const messages = body.details.map(detail => detail.message);
            expect(errorMessages).to.have.members(messages);
        });
    });

});