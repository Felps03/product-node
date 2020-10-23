const { expect, spy } = require('chai');
const SearchProductOperation = require('src/app/operations/product/SearchProductOperation');

describe('App :: Operations :: Product :: SearchProductOperation', () => {

    describe('#execute', () => {
        context('when range of products was requested with success', () => {

            let searchProductOperation, productRepository, productFromDatabase, productRequestedRange, logger;

            before(() => {
                productFromDatabase = [{
                    id: '20',
                    name: 'BeautifulProduct',
                    valueUnitary: '750',
                    amount: '99',
                    lastPriceSold: '750',
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                }]

                productRequestedRange = {
                    min_price: '600',
                    max_price: '800'
                }

                productRepository = {
                    search: () => Promise.resolve(productFromDatabase)
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                }

                searchProductOperation = new SearchProductOperation({ productRepository, logger });

                spy.on(productRepository, 'search');
            });

            it('returns requested products that were in specified range', async () => {
                const response = await searchProductOperation.execute(productRequestedRange);

                expect(response).to.be.deep.equal(productFromDatabase);
                expect(productRepository.search).to.be.called.once.with.exactly(productRequestedRange);
            });
        });

        
        context('when occurs error', () => {

            let productRepository, searchProductOperation, logger;

            before(() => {
                productRepository = {
                    search: () => Promise.reject(new Error('test'))
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                }

                searchProductOperation = new SearchProductOperation({ productRepository, logger });
                spy.on(productRepository, 'search');
            });

            it('throws error', done => {
                searchProductOperation
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