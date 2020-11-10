const { expect } = require('chai');
const purchaseResponseSchema = require('test/support/schema/PurchaseResponseSchema');
const request = require('test/support/request');
const GenerateUserToken = require('src/domain/services/user/GenerateUserToken');
const config = require('config/properties/test.json');


describe('API :: POST /api/purchase', () => {

    context('Make a purchase with success', async () => {
        let product, purchase, generateUserToken, token;
        beforeEach(async () => {

            generateUserToken = GenerateUserToken({ config });
            token = generateUserToken.generate();

            product = {
                'product': {
                    'name': 'Calculadora MAXPRO31',
                    'valueUnitary': 50,
                    'amount': 99
                }
            };

            let { body } = await request()
                .post('/api/products')
                .set('Authorization', 'Bearer ' + token)
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
                .set('Authorization', 'Bearer ' + token)
                .send(purchase)
                .expect(200);

            const { error } = purchaseResponseSchema.create.validate(body);
            expect(error).to.be.not.exist();
        });
    });

    context('Make a purchase with taxes successfully', async () => {
        let product, purchase, response, generateUserToken, token;
        beforeEach(async () => {

            generateUserToken = GenerateUserToken({ config });
            token = generateUserToken.generate();

            product = {
                'product': {
                    'name': 'Calculadora Von Neumann',
                    'valueUnitary': 170,
                    'amount': 99
                }
            };

            let { body } = await request()
                .post('/api/products')
                .set('Authorization', 'Bearer ' + token)
                .send(product);

            purchase = {
                'product': body.id,
                'paymentCondition': {
                    'inputValue': 196.77,
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
                .set('Authorization', 'Bearer ' + token)
                .expect(200);

            const { error } = purchaseResponseSchema.createWithTaxes.validate(body);
            expect(body).to.be.deep.equals(response);
            expect(error).to.be.not.exist();
        });
    });



    context('Try to make a purchase of a product unavailable', async () => {
        let purchase, generateUserToken, token;
        beforeEach(async () => {

            generateUserToken = GenerateUserToken({ config });
            token = generateUserToken.generate();

            purchase = {
                'product': 9999999,
                'paymentCondition': {
                    'inputValue': 200,
                    'numberOfInstallments': 1
                }
            };

        });

        it('returns bad request - Product unavailable', async () => {
            const { body } = await request()
                .post('/api/purchase')
                .set('Authorization', 'Bearer ' + token)
                .send(purchase)
                .expect(400);

            expect(body.message).to.be.eql('Bad Request');

            const message = body.details.shift();
            expect(message).to.be.eql('Product unavailable');

        });
    });

    context('Try to make a purchase of a product that is sold out', async () => {
        let purchase, product, generateUserToken, token;
        beforeEach(async () => {

            generateUserToken = GenerateUserToken({ config });
            token = generateUserToken.generate();

            product = {
                'product': {
                    'name': 'Calculadora Von Neumann',
                    'valueUnitary': 170,
                    'amount': 1
                }
            };

            let { body } = await request()
                .post('/api/products')
                .set('Authorization', 'Bearer ' + token)
                .send(product);

            purchase = {
                'product': body.id,
                'paymentCondition': {
                    'inputValue': 196.77,
                    'numberOfInstallments': 7
                }
            };

            await request()
                .post('/api/purchase')
                .set('Authorization', 'Bearer ' + token)
                .send(purchase);
        });


        it('returns bad request - Product Sold Out', async () => {
            const { body } = await request()
                .post('/api/purchase')
                .set('Authorization', 'Bearer ' + token)
                .send(purchase)
                .expect(400);

            expect(body.message).to.be.eql('Bad Request');

            const message = body.details.shift();
            expect(message).to.be.eql('Sold Out');

        });
    });

    context('Try to make a purchase of a product with input value lower than product price', async () => {
        let purchase, product, generateUserToken, token;
        beforeEach(async () => {

            generateUserToken = GenerateUserToken({config});  
            token = generateUserToken.generate();    
            
            product = {
                'product': {
                    'name': 'Calculadora Von Neumann',
                    'valueUnitary': 170,
                    'amount': 1
                }
            };

            let { body } = await request()
                .post('/api/products')
                .set('Authorization', 'Bearer ' + token)
                .send(product);

            purchase = {
                'product': body.id,
                'paymentCondition': {
                    'inputValue': 160,
                    'numberOfInstallments': 1
                }
            };
        });


        it('returns bad request - Insufficient Funds', async () => {
            const { body } = await request()
                .post('/api/purchase')
                .set('Authorization', 'Bearer ' + token)
                .send(purchase)
                .expect(400);

            expect(body.message).to.be.eql('Bad Request');

            const message = body.details.shift();
            expect(message).to.be.eql('Insuffient Funds - Total price for 1 installments is 170');

        });
    });
});
