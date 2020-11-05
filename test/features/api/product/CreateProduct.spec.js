const { expect } = require('chai');
const productResponseSchema = require('test/support/schema/ProductResponseSchema');
const request = require('test/support/request');
const GenerateUserToken = require('src/domain/services/user/GenerateUserToken');
const config = require('config/properties/test.json');


describe('API :: POST /api/products', () => {

    context('Create product with success', async () => {
        let bodyCreateProduct, token, generateUserToken;

        beforeEach(async () => {
            bodyCreateProduct = {
                'product': {
                    'name': 'Calculadora MAXPRO31',
                    'valueUnitary': 34.0,
                    'amount': 90
                }
            };

            generateUserToken = GenerateUserToken({config});

            token = generateUserToken.generate();
        });

        it('Create product with all fields', async () => {
            const { body } = await request()
                .post('/api/products')
                .set('Authorization', 'Bearer ' + token)
                .send(bodyCreateProduct)
                .expect(201);

            const { error } = productResponseSchema.create.validate(body);
            expect(error).to.be.not.exist();
        });
    });

    context('Create product without value, name and amount', async () => {
        let bodyCreateProduct;
        beforeEach(async () => bodyCreateProduct = { 'product': {} });
        it('returns bad request error', async () => {
            const { body } = await request()
                .post('/api/products')
                .send(bodyCreateProduct)
                .expect(400);

            expect(body.message).to.be.eql('Bad Request');

            const errorMessages = [
                '"product.name" is required',
                '"product.valueUnitary" is required',
                '"product.amount" is required'
            ];

            const messages = body.details.map(detail => detail.message);
            expect(errorMessages).to.have.members(messages);
        });
    });

});