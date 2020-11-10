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
                        inputValue: 199.99,
                        numberOfInstallments: 1
                    }
                };

                productFromDatabase = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 199.99,
                    amount: 99,
                    lastPriceSold: null,
                    lastTimeSold: null,
                    created_at: '2020-10-13T11:55:15.522Z',
                }];

                purchaseApproved = {
                    productId: 9,
                    paymentCondition: {
                        inputValue: 199.99,
                        numberOfInstallments: 1
                    },
                    installments: [{
                        numberOfInstallment: 1,
                        value: 199.99,
                    }],
                    totalPrice: 199.99
                };

                purchaseValidator = PurchaseValidator(exception);


            });

            it('returns installments data', () => {
                const response = purchaseValidator.validate(purchaseToBeCreated, productFromDatabase);
                console.log(response)
                expect(response).to.be.deep.equal(purchaseApproved);
            });
        });

<<<<<<< HEAD
=======

        context('when purchase with taxes is validated with success', () => {

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
                        inputValue: 578.76,
                        numberOfInstallments: 7
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
                    paymentCondition: { inputValue: 578.76, numberOfInstallments: 7 },
                    installments: [
                        {
                            numberOfInstallment: 1,
                            value: 82.68,
                            monthlyInterestRate: '2.25%'
                        },
                        {
                            numberOfInstallment: 2,
                            value: 82.68,
                            monthlyInterestRate: '2.25%'
                        },
                        {
                            numberOfInstallment: 3,
                            value: 82.68,
                            monthlyInterestRate: '2.25%'
                        },
                        {
                            numberOfInstallment: 4,
                            value: 82.68,
                            monthlyInterestRate: '2.25%'
                        },
                        {
                            numberOfInstallment: 5,
                            value: 82.68,
                            monthlyInterestRate: '2.25%'
                        },
                        {
                            numberOfInstallment: 6,
                            value: 82.68,
                            monthlyInterestRate: '2.25%'
                        },
                        {
                            numberOfInstallment: 7,
                            value: 82.68,
                            monthlyInterestRate: '2.25%'
                        }
                    ],
                    totalPrice: 578.76
                };

                purchaseValidator = PurchaseValidator(exception);


            });

            it('returns installments data with taxes', () => {

                const response = purchaseValidator.validate(purchaseToBeCreated, productFromDatabase);
                expect(response).to.be.deep.equal(purchaseApproved);
            });
        });

>>>>>>> 60506cc... feat(domain) Add validation for purchase with taxes
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
                    expect(exception.badRequest).to.have.been.called.with.exactly([`Insuffient Funds - Total price for 1 installments is 550`]);
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