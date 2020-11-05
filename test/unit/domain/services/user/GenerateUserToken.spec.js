const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const GenerateUserToken = require('src/domain/services/user/GenerateUserToken');
const config = require('config/properties/test.json');


describe('Domain :: Services :: User :: GenerateUserToken', () => {

    context('When a new token is requested', () => {
        let generateUserToken, token, valid;

        beforeEach(() => {

            generateUserToken = GenerateUserToken({ config });

        });

        it('returns a valid token', () => {
            
            token = generateUserToken.generate();
            valid = jwt.verify(token, config.auth.secret, (err) => { if (!err) return true; });
            
            expect(token).to.be.a('string');
            expect(valid).to.equal(true);
        });
    });

    context('When a token validation is requested', () => {
        let generateUserToken, token, valid, params = {};

        beforeEach(() => {

            generateUserToken = GenerateUserToken({ config });

            token = jwt.sign(params, config.auth.secret, { expiresIn: 86400 });

        });

        it('returns true', () => {
            
            valid = generateUserToken.validate(token);
            expect(valid).to.equal(true);
        });
    });
    
    context('When a token is invalid', () => {
        let generateUserToken, invalidKeyToken, token, valid, params = {};

        beforeEach(() => {
            
            invalidKeyToken = 'SomeRandonInvalidKey';
            generateUserToken = GenerateUserToken({ config });

            token = jwt.sign(params, invalidKeyToken, { expiresIn: 86400 });

        });

        it('returns true', () => {
            
            valid = generateUserToken.validate(token);
            expect(valid).to.equal(undefined);
        });
    });
});