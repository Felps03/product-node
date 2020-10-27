const { expect } = require('chai');
const ProductRouter = require('src/interfaces/http/presentation/product/ProductRouter');

describe('Interfaces :: Http :: Presentation :: Product :: ProductRouter', () => {
    context('when product routes are requested by Router', () => {
        let productRouter, container, arrayWithRoutes;

        before(() => {

            arrayWithRoutes = [
                {
                    method: 'post',
                    path: '/',
                    validation: { body: null },
                    handler: null
                },
                {
                    method: 'get',
                    path: '/search',
                    validation: { query: null },
                    handler: null
                },
                {
                    method: 'get',
                    path: '/:id',
                    validation: { params: null },
                    handler: null
                },
                {
                    method: 'get',
                    path: '/',
                    validation: {},
                    handler: null
                }
            ];
            container = {
                cradle: {
                    productSchema: {
                        query: null,
                        params: null,
                        create: null
                    },
                    productController: {
                        getProduct: null,
                        searchProduct: null,
                        createProduct: null
                    }
                }
            };
            productRouter = ProductRouter({ container });
        });

        it('return an array with routes data', async () => {
            expect(productRouter).to.deep.equal(arrayWithRoutes);
        });
    });
});