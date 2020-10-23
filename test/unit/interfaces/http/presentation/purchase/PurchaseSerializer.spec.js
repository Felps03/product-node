const { expect, spy } = require('chai');
const PurchaseSerializer = require('src/interfaces/http/presentation/purchase/PurchaseSerializer');

describe('Interfaces :: Http :: Presentation :: Purchase :: PurchaseSerializer', () => {
    describe('#serializePurchase', () => {

        context('when serialize a purchase without taxes is successful', () => {

            let purchaseSerializer, purchaseSerialized, purchaseFromDatabase;

            before(() => {

                purchaseSerialized = [
                    { value: '500', numberOfInstallment: '1' },
                    { value: '500', numberOfInstallment: '2' }
                ]

                purchaseFromDatabase = {
                    id: '98',
                    productId: '9',
                    paymentCondition: {
                        inputValue: "1000",
                        numberOfInstallments: "2"
                    },
                    installments: [{
                        numberOfInstallment: "1",
                        value: "500",
                        monthlyInterestRate: null
                    },
                    {
                        numberOfInstallment: "2",
                        value: "500",
                        monthlyInterestRate: null
                    }],
                    created_at: '2020-10-13T11:55:15.522Z',
                }

                purchaseSerializer = PurchaseSerializer();
            });

            it('returns number of installments and its values', () => {

                const response = purchaseSerializer.create(purchaseFromDatabase);
                expect(response).to.deep.equal(purchaseSerialized);

            });
        });

        context('when serialize a purchase with taxes is successful', () => {

            let purchaseSerializer, purchaseSerialized, purchaseFromDatabase;

            before(() => {

                purchaseSerialized = [
                    { value: '306.75', numberOfInstallment: '1', monthlyInterestRate: "2.25" },
                    { value: '306.75', numberOfInstallment: '2', monthlyInterestRate: "2.25" },
                    { value: '306.75', numberOfInstallment: '3', monthlyInterestRate: "2.25" },
                    { value: '306.75', numberOfInstallment: '4', monthlyInterestRate: "2.25" },
                    { value: '306.75', numberOfInstallment: '5', monthlyInterestRate: "2.25" },
                    { value: '306.75', numberOfInstallment: '6', monthlyInterestRate: "2.25" }
                ]

                purchaseFromDatabase = {
                    id: '98',
                    productId: '9',
                    paymentCondition: {
                        inputValue: "1800",
                        numberOfInstallments: "6"
                    },
                    installments: [{
                        numberOfInstallment: "1",
                        value: "306.75",
                        monthlyInterestRate: "2.25"
                    },
                    {
                        numberOfInstallment: "2",
                        value: "306.75",
                        monthlyInterestRate: "2.25"
                    },
                    {
                        numberOfInstallment: "3",
                        value: "306.75",
                        monthlyInterestRate: "2.25"
                    },
                    {
                        numberOfInstallment: "4",
                        value: "306.75",
                        monthlyInterestRate: "2.25"
                    },
                    {
                        numberOfInstallment: "5",
                        value: "306.75",
                        monthlyInterestRate: "2.25"
                    },
                    {
                        numberOfInstallment: "6",
                        value: "306.75",
                        monthlyInterestRate: "2.25"
                    }],
                    created_at: '2020-10-13T11:55:15.522Z',
                }

                purchaseSerializer = PurchaseSerializer();
            });

            it('returns number of installments, its values and tax range', () => {

                const response = purchaseSerializer.create(purchaseFromDatabase);
                expect(response).to.deep.equal(purchaseSerialized);

            });
        });
    });
});