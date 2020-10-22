const { expect, spy } = require('chai');
const PurchaseController = require('src/interfaces/http/presentation/purchase/PurchaseController');

describe('Interfaces :: Http :: Presentation :: Purchase :: PurchaseController', () => {

    describe('#purchaseProduct', () => {

        context('when a purchase request is successful', () => {

            let purchaseController,
                ctx,
                opts,
                purchaseSerialized = [{
                    numberOfInstallments: "1",
                    value: "9999.99"
                }],
                purchaseFromDatabase = {
                    id: '98',
                    productId: '9',
                    paymentCondition: {
                        inputValue: "9999.99",
                        numberOfInstallments: "1"
                    },
                    installments: [{
                        numberOfInstallments: "1",
                        value: "9999.99",
                        monthlyInterestRate: null
                    }],
                    created_at: '2020-10-13T11:55:15.522Z',
                }

            before(() => {
                opts = {
                    createPurchaseOperation: {
                        execute: () => Promise.resolve(purchaseFromDatabase)
                    },
                    purchaseSerializer: {
                        create: () => (purchaseSerialized)
                    },
                    httpConstants: {
                        code: ({
                            OK: 'ok'
                        })
                    }
                };

                ctx = {
                    body: {
                        product: "9",
                        paymentCondition: {
                            inputValue: "9999.99",
                            numberOfInstallments: "1"
                        }
                    },
                    res: {
                        status: () => ({
                            json: () => (purchaseSerialized)
                        })
                    }
                };

                purchaseController = PurchaseController(opts);

                spy.on(opts.createPurchaseOperation, 'execute');
                spy.on(opts.purchaseSerializer, 'create');
                spy.on(ctx.res, 'status');
            });

            it(' returns an array of installments ', async () => {

                const response = await purchaseController.createPurchase(ctx);
                expect(opts.createPurchaseOperation.execute).to.have.been.called.once.with.exactly(ctx.body);
                expect(opts.purchaseSerializer.create).to.have.been.called.once.with.exactly(purchaseFromDatabase);
                expect(ctx.res.status).to.have.been.called.once();
                expect(response).to.deep.equal(purchaseSerialized);

            });
        });
        context('when occurs error', () => {

            let purchaseController, ctx, opts

            before(() => {
                opts = {
                    createPurchaseOperation: {
                        execute: () => Promise.Reject({ error_code: 'teste' })
                    }
                };

                ctx = {
                    body: {
                        product: "9",
                        paymentCondition: {
                            inputValue: "9999.99",
                            numberOfInstallments: "1"
                        }
                    },
                    res: {
                        status: () => ({
                            json: () => ({})
                        })
                    }
                };

                purchaseController = PurchaseController(opts);

                spy.on(opts.createPurchaseOperation, 'execute');

            });

            it(' returns error ', async () => {

                purchaseController
                    .createPurchase(ctx)
                    .then(() => document('Must be an error'))
                    .catch((error => {
                        expect(opts.createPurchaseOperation.execute).to.have.been.called.once();
                        expect(error).to.be.exist();
                        expect()
                    }))
            });
        });
    });
});    
