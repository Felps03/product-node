const { expect, spy } = require('chai');
const PurchaseValidator = require('src/domain/services/purchase/PurchaseValidator');

describe('Domain :: Services :: Purchase :: PurchaseValidator', () => {

    describe('#validate', () => {
        context('when purchase is validated with success', () => {

            let purchaseValidator,
                productFromDatabase,
                purchaseToBeCreated,
                purchaseApproved,
                exception;

            before(() => {

                exception = {
                    badRequest: () => new Error('Error test')
                };

                purchaseToBeCreated = {
                    product: 9,
                    paymentCondition: {
                        inputValue: 500,
                        numberOfInstallments: 1
                    }
                };

                productFromDatabase = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 500,
                    amount: 99,
                    lastPriceSold: null,
                    lastTimeSold: null,
                    created_at: '2020-10-13T11:55:15.522Z',
                }];

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

                purchaseValidator = PurchaseValidator(exception);


            });

            it('returns installments data', () => {
                const response = purchaseValidator.validate(purchaseToBeCreated, productFromDatabase);
                expect(response).to.be.deep.equal(purchaseApproved);
            });
        });

        context('when input value is lower than product price', () => {

            let purchaseValidator,
                productFromDatabase,
                purchaseToBeCreated,
                exception;

            before(() => {

                exception = {
                    badRequest: () => { throw new Error('Error test'); }
                };

                purchaseToBeCreated = {
                    product: 9,
                    paymentCondition: {
                        inputValue: 500,
                        numberOfInstallments: 1
                    }
                };

                productFromDatabase = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 550,
                    amount: 99,
                    lastPriceSold: null,
                    lastTimeSold: null,
                    created_at: '2020-10-13T11:55:15.522Z',
                }];

                purchaseValidator = PurchaseValidator({ exception });
                spy.on(exception, 'badRequest');

            });

            it('returns badRequest - insufficient funds', () => {
                try {
                    purchaseValidator.validate(purchaseToBeCreated, productFromDatabase);
                } catch (error) {

                    expect(error).to.be.exist();
                    expect(exception.badRequest).to.have.been.called.with.exactly(['Insufficient funds']);
                }
            });
        });

        context('when product is out of stock', () => {

            let purchaseValidator,
                productFromDatabase,
                purchaseToBeCreated,
                exception;

            before(() => {

                exception = {
                    badRequest: () => { throw new Error('Error test'); }
                };

                purchaseToBeCreated = {
                    product: 9,
                    paymentCondition: {
                        inputValue: 600,
                        numberOfInstallments: 1
                    }
                };

                productFromDatabase = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 550,
                    amount: 0,
                    lastPriceSold: 550,
                    lastTimeSold: '2020-10-13T11:55:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                }];

                purchaseValidator = PurchaseValidator({ exception });
                spy.on(exception, 'badRequest');

            });

            it('returns badRequest - Sold Out', () => {
                try {
                    purchaseValidator.validate(purchaseToBeCreated, productFromDatabase);
                } catch (error) {

                    expect(error).to.be.exist();
                    expect(exception.badRequest).to.have.been.called.with.exactly(['Sold Out']);
                }
            });
        });
    });
});