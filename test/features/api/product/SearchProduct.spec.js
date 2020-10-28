const { expect } = require('chai');
const productResponseSchema = require('test/support/schema/ProductResponseSchema');
const request = require('test/support/request');


describe('API :: GET /api/products/search', () => {

    context('Request products with price range successfully', async () => {
        let productOne, productTwo, productThree;
        beforeEach(async () => {

            productOne = {
                'product': {
                    'name': 'Calculadora MAXPRO31',
                    'valueUnitary': 50,
                    'amount': 99
                }
            };

            productTwo = {
                'product': {
                    'name': 'Teclado MasterTest',
                    'valueUnitary': 150,
                    'amount': 99
                }
            };

            productThree = {
                'product': {
                    'name': 'HD 1Tera TesterMegazord',
                    'valueUnitary': 300,
                    'amount': 99
                }
            };

            await request()
                .post('/api/products')
                .send(productOne);

            await request()
                .post('/api/products')
                .send(productTwo);

            await request(productThree)
                .post('/api/products')
                .send(productThree);


        });

        it('returns an array with products that matches the filter inserted', async () => {
            const { body } = await request()
                .get('/api/products/search')
                .query({ min_price: 100, max_price: 200 })
                .expect(200);
            
            const { error } = productResponseSchema.search.validate(body);
            expect(error).to.be.not.exist();
        });
    });

    context('Request a inexistent product', async () => {

        it('returns an empty array', async () => {
            const { body } = await request()
                .get('/api/products/search')
                .query({ min_price: 10000 })
                .expect(200);

            expect(body).to.be.eqls([]);
        });
    });
});