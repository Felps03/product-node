const { expect } = require('chai');
const PurchaseValidator = require('src/domain/services/purchase/PurchaseValidator');

describe('Domain :: Services :: Purchase :: PurchaseValidator', () => {

    describe('#validate', () => {
        context('when purchase is validated with success', () => {

            let purchaseValidator,
                productFromDatabase,
                purchaseToBeCreated,
                purchaseApproved;

            before(() => {
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

                purchaseValidator = PurchaseValidator();


            });

            it('returns installments data', () => {
                const response = purchaseValidator.validate(purchaseToBeCreated, productFromDatabase);
                expect(response).to.be.deep.equal(purchaseApproved);
            });
        });
    });
});