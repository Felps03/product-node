const { expect, spy } = require('chai');
const GetProductOperation = require('src/app/operations/product/GetProductOperation');

describe('App :: Operations :: Product :: GetProductOperation', () => {

    describe('#execute', () => {
        context('when an unique product was requested with success', () => {

            let getProductOperation, productRepository, productFromDatabase, request, logger;

            before(() => {
                productFromDatabase = {
                    docs: [{
                        id: 9,
                        name: 'SomeProduct',
                        valueUnitary: 999,
                        amount: 99,
                        lastPriceSold: 999,
                        lastTimeSold: '2020-10-15T11:50:15.522Z',
                        created_at: '2020-10-13T11:55:15.522Z',
                    }],
                    totalDocs: 22,
                    limit: 10,
                    totalPages: 3,
                    page: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: true,
                    prevPage: null,
                    nextPage: 2

                };

                request = {
                    params: { id: 9 },
                    query: { page: 1 }

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
                const response = await getProductOperation.execute(request);

                expect(response).to.be.deep.equal(productFromDatabase);
                expect(productRepository.get).to.be.called.once.with.exactly(request.params, request.query.page);
            });
        });

        context('when more than one product was requested with success', () => {

            let getProductOperation, productRepository, productFromDatabase, request, logger;

            before(() => {
                productFromDatabase = {
                    docs: [{
                        id: 9,
                        name: 'SomeProduct',
                        valueUnitary: 999,
                        amount: 99,
                        lastPriceSold: 999,
                        lastTimeSold: '2020-10-15T11:50:15.522Z',
                        created_at: '2020-10-13T11:55:15.522Z',
                    },
                    {
                        id: 10,
                        name: 'AnotherProduct',
                        valueUnitary: 999,
                        amount: 99,
                        lastPriceSold: 999,
                        lastTimeSold: '2020-10-15T11:50:15.522Z',
                        created_at: '2020-10-13T11:55:15.522Z',
                    }],
                    totalDocs: 22,
                    limit: 10,
                    totalPages: 3,
                    page: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: true,
                    prevPage: null,
                    nextPage: 2
                };

                request = {
                    params: { id: '' },
                    query: { page: '' }
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
                const response = await getProductOperation.execute(request);

                expect(response).to.be.deep.equal(productFromDatabase);
                expect(productRepository.get).to.be.called.once.with.exactly(request.params, request.query.page);
            });
        });

        context('when occurs error', () => {

            let productRepository, getProductOperation, logger, request;

            before(() => {

                request = {
                    params: { id: 9 },
                    query: { page: 1 }

                };

                productRepository = {
                    get: () => Promise.reject(new Error('test'))
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };

                getProductOperation = new GetProductOperation({ productRepository, logger });
                spy.on(productRepository, 'get');
                spy.on(logger, 'error');
            });

            it('throws error', done => {
                getProductOperation
                    .execute(request)
                    .then(done => done('Must be an error'))
                    .catch(error => {
                        expect(error).to.be.exist();
                        expect(error.message).to.be.eql('test');
                        expect(productRepository.get).to.have.been.called.once();
                        expect(logger.error).to.have.been.called.once();
                        done();
                    });
            });
        });
    });
});