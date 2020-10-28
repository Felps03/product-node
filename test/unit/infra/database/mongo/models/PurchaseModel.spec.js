const { expect, spy } = require('chai');
const PurchaseModel = require('src/infra/database/mongo/models/PurchaseModel');
const mongoose = require('mongoose');

describe('Infra :: Database :: Mongo :: Models :: PurchaseModel', () => {

    const config = {
        db: {
            collections: {
                purchase: {
                    name: 'Purchase'
                }
            }
        }
    };

    afterEach(function () {
        mongoose.models = {};
    });

    context('Initializes mongoose schema', () => {
        let providerConnection;

        before(() => {
            providerConnection = {
                connection: {
                    model: (name, schema) => ({ name, schema })
                }
            };
            spy.on(providerConnection.connection, 'model');

        });

        it('returns model name and schema', () => {
            const { name, schema } = PurchaseModel({
                providerConnection,
                config
            });

            expect(name).to.be.equal('purchase');
            expect(schema).to.be.exist();
            expect(providerConnection.connection.model).to.be.called.once();
        });
    });

    context('when fields are ok', () => {
        let purchaseModel, data;
        before(() => {
            const ProviderConnection = {
                connection: {
                    model: (name, schema) => mongoose.model(name, schema)
                }
            };

            purchaseModel = PurchaseModel({
                providerConnection: ProviderConnection,
                config
            });
            data = {
                productId: 9,
                paymentCondition: {
                    inputValue: 999,
                    numberOfInstallments: 1
                },
                installments: [{
                    numberOfInstallment: 1,
                    value: 999,
                }]
            };
        });

        it('returns validate success', () => {
            const model = new purchaseModel(data);
            const error = model.validateSync(data);

            expect(error).to.be.undefined();
        });
    });

    context('when some field is incorrect or missing', () => {
        let purchaseModel, data;
        before(() => {
            const ProviderConnection = {
                connection: {
                    model: (name, schema) => mongoose.model(name, schema)
                }
            };

            purchaseModel = PurchaseModel({
                providerConnection: ProviderConnection,
                config
            });
            data = {};
        });

        it('returns error', () => {
            const model = new purchaseModel(data);
            const error = model.validateSync(data);

            expect(error).to.be.exist();
        });
    });
});