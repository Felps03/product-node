const { expect } = require('chai');
const productResponseSchema = require('test/support/schema/ProductResponseSchema');
const request = require('test/support/request');


describe('API :: GET /api/products', () => {

    context('Request products with success', async () => {

        it('returns an array with product', async () => {
            const { body } = await request()
                .get('/api/products')
                .expect(200);

            const { error } = productResponseSchema.get.validate(body);
            expect(error).to.be.not.exist();
        });
    });
});

describe('API :: GET /api/products/:id', () => {

    context('Request specific product with success', async () => {
        let productId; 
        beforeEach(() => {
            productId = '1';            
        });
        
        it('returns an array with one product', async () => {
            const { body } = await request()
                .get(`/api/products/${productId}`)
                .expect(200);

            const { error } = productResponseSchema.getWithId.validate(body);
            expect(error).to.be.not.exist();
        });
    });

    context('Request a inexistent product', async () => {
        let productId; 
        beforeEach(() => {
            productId = '999';            
        });
        
        it('returns an empty array', async () => {
            const { body } = await request()
                .get(`/api/products/${productId}`)
                .expect(200);

            expect(body).to.be.eqls([]);
        });
    });
});