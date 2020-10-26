const { expect, spy } = require('chai');
const GetProductOperation = require('src/app/operations/product/GetProductOperation');

describe('App :: Operations :: Product :: GetProductOperation', () => {

    describe('#execute', () => {
        context('when an unique product was requested with success', () => {

            let getProductOperation, productRepository, productFromDatabase, productRequestedId, logger;

            before(() => {
                productFromDatabase = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                }];

                productRequestedId = {
                    id: 9
                };

                productRepository = {
                    get: () => Promise.resolve(productFromDatabase)
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };

                getProductOperation = new GetProductOperation({ productRepository, logger });

                spy.on(productRepository, 'get');
            });

            it('returns requested product', async () => {
                const response = await getProductOperation.execute(productRequestedId);

                expect(response).to.be.deep.equal(productFromDatabase);
                expect(productRepository.get).to.be.called.once.with.exactly(productRequestedId);
            });
        });

        context('when more than one product was requested with success', () => {

            let getProductOperation, productRepository, productFromDatabase, productRequestedId, logger;

            before(() => {
                productFromDatabase = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                },
                {
                    id: '10',
                    name: 'AnotherProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                }];

                productRequestedId = {
                    id: ''
                };

                productRepository = {
                    get: () => Promise.resolve(productFromDatabase)
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };

                getProductOperation = new GetProductOperation({ productRepository, logger });

                spy.on(productRepository, 'get');
            });

            it('returns an array with requested products', async () => {
                const response = await getProductOperation.execute(productRequestedId);

                expect(response).to.be.deep.equal(productFromDatabase);
                expect(productRepository.get).to.be.called.once.with.exactly(productRequestedId);
            });
        });

        context('when occurs error', () => {

            let productRepository, getProductOperation, logger;

            before(() => {
                productRepository = {
                    get: () => Promise.reject(new Error('test'))
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };

                getProductOperation = new GetProductOperation({ productRepository, logger });
                spy.on(productRepository, 'get');
            });

            it('throws error', done => {
                getProductOperation
                    .execute({})
                    .then(done => done('Must be an error'))
                    .catch(error => {
                        expect(error).to.be.exist();
                        done();
                    });
            });
        });
    });
});