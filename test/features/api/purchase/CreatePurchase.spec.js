const { expect } = require('chai');
const purchaseResponseSchema = require('test/support/schema/PurchaseResponseSchema');
const request = require('test/support/request');


describe('API :: POST /api/purchase', () => {

    context('Make a purchase with success', async () => {
        let product, purchase;
        beforeEach(async () => {

            product = {
                'product': {
                    'name': 'Calculadora MAXPRO31',
                    'valueUnitary': 50,
                    'amount': 99
                }
            };

            let { body } = await request()
                .post('/api/products')
                .send(product);

            purchase = {
                'product': body.id,
                'paymentCondition': {
                    'inputValue': 50,
                    'numberOfInstallments': 1
                }
            };
        });

        it('returns an array with istallments', async () => {
            const { body } = await request()
                .post('/api/purchase')
                .send(purchase)
                .expect(200);

            const { error } = purchaseResponseSchema.create.validate(body);
            expect(error).to.be.not.exist();
        });
    });

    context('Make a purchase with taxes successfully', async () => {
        let product, purchase, response;
        beforeEach(async () => {

            product = {
                'product': {
                    'name': 'Calculadora Von Neumann',
                    'valueUnitary': 170,
                    'amount': 99
                }
            };

            let { body } = await request()
                .post('/api/products')
                .send(product);

            purchase = {
                'product': body.id,
                'paymentCondition': {
                    'inputValue': 170,
                    'numberOfInstallments': 7
                }
            };

            response = [
                {
                    value: 28.11,
                    numberOfInstallment: 1,
                    monthlyInterestRate: '2.25%'
                },
                {
                    value: 28.11,
                    numberOfInstallment: 2,
                    monthlyInterestRate: '2.25%'
                },
                {
                    value: 28.11,
                    numberOfInstallment: 3,
                    monthlyInterestRate: '2.25%'
                }, {
                    value: 28.11,
                    numberOfInstallment: 4,
                    monthlyInterestRate: '2.25%'
                }, {
                    value: 28.11,
                    numberOfInstallment: 5,
                    monthlyInterestRate: '2.25%'
                }, {
                    value: 28.11,
                    numberOfInstallment: 6,
                    monthlyInterestRate: '2.25%'
                }, {
                    value: 28.11,
                    numberOfInstallment: 7,
                    monthlyInterestRate: '2.25%'
                }];
        });

        it('returns an array with istallments', async () => {
            const { body } = await request()
                .post('/api/purchase')
                .send(purchase)
                .expect(200);

            const { error } = purchaseResponseSchema.createWithTaxes.validate(body);
            expect(body).to.be.deep.equals(response);
            expect(error).to.be.not.exist();
        });
    });
});
