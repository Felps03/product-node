const { expect, spy } = require('chai');
const CreateProductOperation = require('src/app/operations/product/CreateProductOperation');

describe('App :: Operations :: Product :: CreateProductOperation', () => {

    describe('#execute', () => {
        context('when product was created with success', () => {

            let createProductOperation, productRepository, productFromDatabase, productToBeCreated, logger;

            before(() => {
                productFromDatabase = {
                    id: '9',
                    name: 'SomeProduct',
                    valueUnitary: '999',
                    amount: '99',
                    lastPriceSold: '999',
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                }

                productToBeCreated = {
                    name: 'SomeProduct',
                    valueUnitary: '999',
                    amount: '99',
                }
                productRepository = {
                    create: () => Promise.resolve(productFromDatabase)
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                }
                createProductOperation = new CreateProductOperation({ productRepository, logger });
                spy.on(productRepository, 'create');
            });

            it('returns created product', async () => {
                const response = await createProductOperation.execute(productToBeCreated);

                expect(response).to.be.deep.equal(productFromDatabase);
                expect(productRepository.create).to.be.called.once.with.exactly(productToBeCreated);
            });
        });

        context('when occurs error', () => {

            let productRepository, createProductOperation, logger;

            before(() => {
                productRepository = {
                    create: () => Promise.reject(new Error('test'))
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                }

                createProductOperation = new CreateProductOperation({ productRepository, logger });
                spy.on(productRepository, 'create');
            });

            it('throws error', done => {
                createProductOperation
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