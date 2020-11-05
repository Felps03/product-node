const { expect } = require('chai');
const authenticateUserResponseSchema = require('test/support/schema/AuthenticateUserResponseSchema');
const request = require('test/support/request');

describe('API :: POST /api/authenticate', () => {

    context('Authenticate user with success', async () => {
        let bodyAuthenticateUser, bodyRegisterUser;

        beforeEach(async () => {

            bodyRegisterUser = {
                name: 'Linus Torvalds',
                email: 'Linus.Torvalds@linux.com',
                password: 'somerandompassword'
            };

            bodyAuthenticateUser = {
                email: 'Linus.Torvalds@linux.com',
                password: 'somerandompassword'
            };

            await request()
                .post('/api/register')
                .send(bodyRegisterUser)
                .expect(201);


        });

        it('authenticate a user and return a valid token', async () => {
            const { body } = await request()
                .post('/api/authenticate')
                .send(bodyAuthenticateUser)
                .expect(200);

            const { error } = authenticateUserResponseSchema.authenticate.validate(body);
            expect(error).to.be.not.exist();
        });
    });

    context('Try to authenticate user with wrong password', async () => {
        let bodyAuthenticateUser, bodyRegisterUser;

        beforeEach(async () => {

            bodyRegisterUser = {
                name: 'Steve Wozniak',
                email: 'Steve.Wozniak@apple.com',
                password: 'somerandompassword'
            };

            bodyAuthenticateUser = {
                email: 'Steve.Wozniak@apple.com',
                password: 'wrongpassword'
            };

            await request()
                .post('/api/register')
                .send(bodyRegisterUser)
                .expect(201);


        });

        it('returns badRequest - invalid Password', async () => {
            const { body } = await request()
                .post('/api/authenticate')
                .send(bodyAuthenticateUser)
                .expect(400);

            expect(body.message).to.be.eql('Bad Request');
            
            expect(body.details).to.be.eql('Invalid Password');


        });
    });

    context('Try to authenticate user with wrong email', async () => {
        let bodyAuthenticateUser, bodyRegisterUser;

        beforeEach(async () => {

            bodyRegisterUser = {
                name: 'Brendan Eich',
                email: 'Brendan.Eich@netscape.com',
                password: 'somerandompassword'
            };

            bodyAuthenticateUser = {
                email: 'Brendan.Eich@netscape.net',
                password: 'somerandompassword'
            };

            await request()
                .post('/api/register')
                .send(bodyRegisterUser)
                .expect(201);


        });

        it('returns badRequest - invalid Email', async () => {
            const { body } = await request()
                .post('/api/authenticate')
                .send(bodyAuthenticateUser)
                .expect(400);

            expect(body.message).to.be.eql('Bad Request');
            
            expect(body.details).to.be.eql('Invalid Email');


        });
    });

    context('Try to authenticate a user without email and password', async () => {
        let bodyAuthenticateUser;
        beforeEach(async () => bodyAuthenticateUser = {});
        it('returns bad request error', async () => {
            const { body } = await request()
                .post('/api/authenticate')
                .send(bodyAuthenticateUser)
                .expect(400);

            expect(body.message).to.be.eql('Bad Request');

            const errorMessages = [
                '"email" is required',
                '"password" is required'
            ];

            const messages = body.details.map(detail => detail.message);
            expect(errorMessages).to.have.members(messages);
        });
    });

});