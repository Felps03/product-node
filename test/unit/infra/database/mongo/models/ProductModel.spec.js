const { expect, spy } = require('chai');
const ProductModel = require('test/unit/infra/database/mongo/models/src/infra/database/mongo/models/ProductModel');
const mongoose = require('mongoose');

describe('Infra :: Database :: Mongo :: Models :: ProductModel', () => {

    const config = {
        db: {
            collections: {
                products: {
                    name: 'Product'
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
            const { name, schema } = ProductModel({
                providerConnection,
                config
            });

            expect(name).to.be.equal('product');
            expect(schema).to.be.exist();
            expect(providerConnection.connection.model).to.be.called.once();
        });
    });

    context('when fields are ok', () => {
        let productModel, data;
        before(() => {
            const ProviderConnection = {
                connection: {
                    model: (name, schema) => mongoose.model(name, schema)
                }
            };

            productModel = ProductModel({
                providerConnection: ProviderConnection,
                config
            });
            data = {
                name: 'SomeProduct',
                valueUnitary: 240,
                amount: 99
            };
        });

        it('returns validate success', () => {
            const model = new productModel(data);
            const error = model.validateSync(data);

            expect(error).to.be.undefined();
        });
    });

    context('when some field is incorrect or missing', () => {
        let productModel, data;
        before(() => {
            const ProviderConnection = {
                connection: {
                    model: (name, schema) => mongoose.model(name, schema)
                }
            };

            productModel = ProductModel({
                providerConnection: ProviderConnection,
                config
            });
            data = {
                valueUnitary: 240,
                amount: 99
            };
        });

        it('returns error', () => {
            const model = new productModel(data);
            const error = model.validateSync(data);

            expect(error).to.be.exist();
        });
    });
});