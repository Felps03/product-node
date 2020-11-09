const { expect } = require('chai');
const GenerateHash = require('src/domain/services/user/GenerateHash');
const bcrypt = require('bcrypt');

describe('Domain :: Services :: User :: GenerateHash', () => {

    context('When a new hash is requested', () => {
        let generateHash, hash, password;

        beforeEach(() => {

            password = 'somePasswordToBeHashed';
            generateHash = GenerateHash();

        });

        it('returns a hash', async () => {

            hash = await generateHash.generate(password);
            valid = await bcrypt.compare(password, hash);
            expect(hash).to.be.a('string');
            expect(valid).to.equal(true);
        });
    });

    context('When a hash validation is requested', () => {
        let generateHash, hash, password, valid;

        beforeEach(async () => {
            password = 'somePasswordToBeHashed';
            generateHash = GenerateHash();

            hash = await bcrypt.hash(password, 10);

        });

        it('returns true', async () => {

            valid = await generateHash.validate(password, hash);
            expect(valid).to.equal(true);
        });
    });

    context('When a password is invalid', () => {
        let generateHash, hash, password, valid;

        beforeEach(async () => {

            password = 'CorrectPassword';
            invalidPassword = 'SomeRandonInvalidPassword';
            generateHash = GenerateHash();

            hash = await bcrypt.hash(password, 10);

        });

        it('returns false', async () => {

            valid = await generateHash.validate(invalidPassword, hash);
            expect(valid).to.equal(false);
        });
    });
});