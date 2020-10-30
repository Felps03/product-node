const { expect, spy } = require('chai');
const CreatePurchaseOperation = require('src/app/operations/purchase/CreatePurchaseOperation');

describe('App :: Operations :: Purchase :: CreatePurchaseOperation', () => {

    describe('#execute', () => {
        context('when purchase is created with success', () => {

            let createPurchaseOperation,
                productRepository,
                purchaseRepository,
                productFromDatabase,
                productFromDatabaseUpdated,
                purchaseFromDatabase,
                purchaseToBeCreated,
                purchaseApproved,
                purchaseValidator,
                logger;

            before(() => {
                purchaseToBeCreated = {
                    product: 9,
                    paymentCondition: {
                        inputValue: 500,
                        numberOfInstallments: 1
                    }
                };

                productFromDatabase = {
                    docs: [{
                        id: 9,
                        name: 'SomeProduct',
                        valueUnitary: 500,
                        amount: 99,
                        lastPriceSold: null,
                        lastTimeSold: null,
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

                productFromDatabaseUpdated = {
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 500,
                    amount: 98,
                    lastPriceSold: 500,
                    lastTimeSold: '2020-10-26T14:56:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                };

                purchaseApproved = {
                    productId: 9,
                    paymentCondition: {
                        inputValue: 500,
                        numberOfInstallments: 1
                    },
                    installments: [{
                        numberOfInstallment: 1,
                        value: 500,
                    }],
                    totalPrice: 500
                };

                purchaseFromDatabase = {
                    id: 1,
                    productId: 9,
                    paymentCondition: {
                        inputValue: 500,
                        numberOfInstallments: 1
                    },
                    installments: [{
                        numberOfInstallment: 1,
                        value: 500,
                    }],
                    created_at: '2020-10-13T11:55:15.522Z',
                    updated_at: '2020-10-13T11:55:15.522Z'
                };

                productRepository = {
                    get: () => Promise.resolve(productFromDatabase),
                    update: () => Promise.resolve(productFromDatabaseUpdated)
                };

                purchaseRepository = {
                    create: () => Promise.resolve(purchaseFromDatabase),
                };

                purchaseValidator = {
                    validate: () => purchaseApproved
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };
                createPurchaseOperation = new CreatePurchaseOperation({ productRepository, purchaseValidator, purchaseRepository, logger });
                spy.on(productRepository, 'get');
                spy.on(productRepository, 'update');
                spy.on(purchaseRepository, 'create');
                spy.on(purchaseValidator, 'validate');

            });

            it('returns installments data', async () => {
                const response = await createPurchaseOperation.execute(purchaseToBeCreated);
                expect(response).to.be.deep.equal(purchaseFromDatabase);
                expect(productRepository.get).to.be.called.once.with.exactly({ id: purchaseToBeCreated.product });
                expect(productRepository.update).to.be.called.once.with.exactly(purchaseApproved);
                expect(purchaseRepository.create).to.be.called.once.with.exactly(purchaseApproved);
                expect(purchaseValidator.validate).to.be.called.once.with.exactly(purchaseToBeCreated, productFromDatabase.docs);
            });
        });

        context('when purchase with taxes is created with success', () => {

            let createPurchaseOperation,
                productRepository,
                purchaseRepository,
                productFromDatabase,
                productFromDatabaseUpdated,
                purchaseFromDatabase,
                purchaseToBeCreated,
                purchaseApproved,
                purchaseValidator,
                logger;

            before(() => {
                purchaseToBeCreated = {
                    product: 10,
                    paymentCondition: {
                        inputValue: 240,
                        numberOfInstallments: 6
                    }
                };

                productFromDatabase = {
                    docs: [{
                        id: 10,
                        name: 'SomeProduct',
                        valueUnitary: 240,
                        amount: 99,
                        lastPriceSold: null,
                        lastTimeSold: null,
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

                productFromDatabaseUpdated = {
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 240,
                    amount: 98,
                    lastPriceSold: 240,
                    lastTimeSold: '2020-10-26T14:56:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                };

                purchaseApproved = {
                    productId: 9,
                    paymentCondition: {
                        inputValue: 500,
                        numberOfInstallments: 6
                    },
                    installments: [{
                        numberOfInstallment: 1,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 2,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 3,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 4,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 5,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 6,
                        value: 46,
                        monthlyInterestRate: '2.5%'
                    }],
                    totalPrice: 276
                };

                purchaseFromDatabase = {
                    id: 1,
                    productId: 10,
                    paymentCondition: {
                        inputValue: 240,
                        numberOfInstallments: 6
                    },
                    installments: [{
                        numberOfInstallment: 1,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 2,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 3,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 4,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 5,
                        value: 46,
                        monthlyInterestRate: '2.5%'

                    }, {
                        numberOfInstallment: 6,
                        value: 46,
                        monthlyInterestRate: '2.5%'
                    }],
                    created_at: '2020-10-13T11:55:15.522Z',
                    updated_at: '2020-10-13T11:55:15.522Z'
                };

                productRepository = {
                    get: () => Promise.resolve(productFromDatabase),
                    update: () => Promise.resolve(productFromDatabaseUpdated)
                };

                purchaseRepository = {
                    create: () => Promise.resolve(purchaseFromDatabase),
                };

                purchaseValidator = {
                    validate: () => purchaseApproved
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };
                createPurchaseOperation = new CreatePurchaseOperation({ productRepository, purchaseValidator, purchaseRepository, logger });
                spy.on(productRepository, 'get');
                spy.on(productRepository, 'update');
                spy.on(purchaseRepository, 'create');
                spy.on(purchaseValidator, 'validate');

            });

            it('returns installments with interestRate', async () => {
                const response = await createPurchaseOperation.execute(purchaseToBeCreated);
                expect(response).to.be.deep.equal(purchaseFromDatabase);
                expect(productRepository.get).to.be.called.once.with.exactly({ id: purchaseToBeCreated.product });
                expect(productRepository.update).to.be.called.once.with.exactly(purchaseApproved);
                expect(purchaseRepository.create).to.be.called.once.with.exactly(purchaseApproved);
                expect(purchaseValidator.validate).to.be.called.once.with.exactly(purchaseToBeCreated, productFromDatabase.docs);
            });
        });

        context('when occurs error', () => {

            let createPurchaseOperation, purchaseRepository, logger;

            before(() => {
                purchaseRepository = {
                    create: () => Promise.reject(new Error('test'))
                };

                logger = {
                    error: () => ({ erro: 'Error was logged' })
                };

                createPurchaseOperation = new CreatePurchaseOperation({ purchaseRepository, logger });
                spy.on(purchaseRepository, 'create');
            });

            it('throws error', done => {
                createPurchaseOperation
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