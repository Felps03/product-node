const { expect, spy } = require('chai');
const PurchaseRepository = require('test/unit/infra/database/repository/src/infra/database/repository/PurchaseRepository');


describe('Infra :: Database :: Repository :: PurchaseRepository', () => {
    let purchaseRequested, purchaseFromDatabase, purchaseRepository, purchaseModel;
    context('When purchase is created with success', () => {

        beforeEach(() => {
            purchaseFromDatabase = {
                id: 98,
                productId: 9,
                paymentCondition: {
                    inputValue: 1000,
                    numberOfInstallments: 1
                },
                installments: [{
                    numberOfInstallment: 1,
                    value: 500,
                    monthlyInterestRate: null
                }]
            };

            purchaseModel = {
                create: () => Promise.resolve(purchaseFromDatabase)
            };

            purchaseRequested = {
                productId: 9,
                paymentCondition: {
                    inputValue: 1000,
                    numberOfInstallments: 1
                },
                installments: [{
                    numberOfInstallment: 1,
                    value: 1000,
                }],
                totalPrice: 1000
            };

            spy.on(purchaseModel, 'create');
            purchaseRepository = new PurchaseRepository({ purchaseModel });
        });

        it(' returns full purchase data from database', async () => {

            const response = await purchaseRepository.create(purchaseRequested);
            expect(purchaseModel.create).to.be.called.once.with.exactly(purchaseRequested);
            expect(response).to.deep.equal(purchaseFromDatabase);
        });
    });



    context('when ocucurs an error', () => {
        let purchaseRepository, purchaseModel;
        before(() => {

            purchaseModel = {
                create: () => Promise.reject(new Error('Erro de teste'))
            };

            purchaseRepository = new PurchaseRepository({ purchaseModel });
            spy.on(purchaseModel, 'create');
        });

        it('throws an error', done => {

            purchaseRepository
                .create({})
                .then(() => done('Must be an error'))
                .catch(erro => {
                    expect(erro).to.be.exist();
                    expect(purchaseModel.create).to.be.called.once();
                    done();
                });
        });
    });
}); 