const { expect, spy } = require('chai');
const ProductController = require('src/interfaces/http/presentation/product/ProductController');

describe('Interfaces :: Http :: Presentation :: Product :: ProductController', () => {
    describe('#createProduct', () => {

        context('when create a product is successful', () => {

            let productController,
                ctx,
                opts,
                productSerialized = {
                    id: 9,
                    name: 'SomeProduct',
                    status: 'created'
                },
                productFromDatabase = {
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: null,
                    lastTimeSold: null,
                    created_at: '2020-10-13T11:55:15.522Z',
                };

            before(() => {
                opts = {
                    createProductOperation: {
                        execute: () => Promise.resolve(productFromDatabase)
                    },
                    productSerializer: {
                        create: () => (productSerialized)
                    },
                    httpConstants: {
                        code: ({
                            CREATED: 'created'
                        })
                    }
                };

                ctx = {
                    body: {
                        name: 'SomeProduct',
                        valueUnitary: 999,
                        amount: 99
                    },
                    res: {
                        status: () => ({
                            json: () => (productSerialized)
                        })
                    }
                };

                productController = ProductController(opts);

                spy.on(opts.createProductOperation, 'execute');
                spy.on(opts.productSerializer, 'create');
                spy.on(ctx.res, 'status');
            });

            it('returns product name and status', async () => {

                const response = await productController.createProduct(ctx);
                expect(opts.createProductOperation.execute).to.have.been.called.once.with.exactly(ctx.body);
                expect(opts.productSerializer.create).to.have.been.called.once.with.exactly(productFromDatabase);
                expect(ctx.res.status).to.have.been.called.once();
                expect(response).to.deep.equal(productSerialized);

            });
        });
    });

    describe('#getProduct', () => {

        context('when a unique product request is successful', () => {

            let productController,
                ctx,
                opts,
                productSerialized = {
                    name: 'ProductTest',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lasTimeSold: '2020-10-13T11:55:15.522Z'
                },
                productFromDatabase = {
                    id: 9,
                    name: 'ProductTest',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: null,
                    lastTimeSold: null,
                    created_at: '2020-10-13T11:55:15.522Z',
                };

            before(() => {
                opts = {
                    getProductOperation: {
                        execute: () => Promise.resolve(productFromDatabase)
                    },
                    productSerializer: {
                        getOne: () => (productSerialized)
                    },
                    httpConstants: {
                        code: ({
                            OK: 'ok'
                        })
                    }
                };

                ctx = {
                    params: {
                        id: 9
                    },
                    res: {
                        status: () => ({
                            json: () => (productSerialized)
                        })
                    }
                };

                productController = ProductController(opts);

                spy.on(opts.getProductOperation, 'execute');
                spy.on(opts.productSerializer, 'getOne');
                spy.on(ctx.res, 'status');
            });

            it(' returns product data ', async () => {

                const response = await productController.getProduct(ctx);
                expect(opts.getProductOperation.execute).to.have.been.called.once.with.exactly(ctx.params);
                expect(opts.productSerializer.getOne).to.have.been.called.once.with.exactly(productFromDatabase);
                expect(ctx.res.status).to.have.been.called.once();
                expect(response).to.deep.equal(productSerialized);

            });
        });
    });

    describe('#searchProduct', () => {

        context('when a product request with filters is successful', () => {

            let productController,
                ctx,
                opts,
                productSerialized = [{
                    name: 'ProductTest',
                    valueUnitary: 999,
                    amount: 99,
                },
                {
                    name: 'AnotherProductTest',
                    valueUnitary: 999,
                    amount: 99,
                }],
                productFromDatabase = [{
                    id: 9,
                    name: 'ProductTest',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: null,
                    lastTimeSold: null,
                    created_at: '2020-10-13T11:55:15.522Z',
                }, {
                    id: '10',
                    name: 'ProductTest',
                    valueUnitary: '998',
                    amount: '90',
                    lastPriceSold: null,
                    lastTimeSold: null,
                    created_at: '2020-10-14T11:56:15.522Z',
                }];

            before(() => {
                opts = {
                    searchProductOperation: {
                        execute: () => Promise.resolve(productFromDatabase)
                    },
                    productSerializer: {
                        search: () => (productSerialized)
                    },
                    httpConstants: {
                        code: ({
                            OK: 'ok'
                        })
                    }
                };

                ctx = {
                    query: {
                        min_price: '1',
                        max_price: 999
                    },
                    res: {
                        status: () => ({
                            json: () => (productSerialized)
                        })
                    }
                };

                productController = ProductController(opts);

                spy.on(opts.searchProductOperation, 'execute');
                spy.on(opts.productSerializer, 'search');
                spy.on(ctx.res, 'status');
            });

            it(' returns products data ', async () => {

                const response = await productController.searchProduct(ctx);
                expect(opts.searchProductOperation.execute).to.have.been.called.once.with.exactly(ctx.query);
                expect(opts.productSerializer.search).to.have.been.called.once.with.exactly(productFromDatabase);
                expect(ctx.res.status).to.have.been.called.once();
                expect(response).to.deep.equal(productSerialized);

            });
        });
        context('when occurs error', () => {

            let productController, ctx, opts;

            before(() => {
                opts = {
                    searchProductOperation: {
                        execute: () => Promise.Reject({ error_code: 'teste' })
                    }
                };

                ctx = {
                    query: {
                        min_price: '1',
                        max_price: 999
                    },
                    res: {
                        status: () => ({
                            json: () => ({})
                        })
                    }
                };

                productController = ProductController(opts);

                spy.on(opts.searchProductOperation, 'execute');

            });

            it(' returns products data ', async () => {

                productController
                    .searchProduct(ctx)
                    .then(() => document('Must be an error'))
                    .catch((error => {
                        expect(opts.searchProductOperation.execute).to.have.been.called.once();
                        expect(error).to.be.exist();
                        expect();
                    }));
            });
        });
    });
});    
