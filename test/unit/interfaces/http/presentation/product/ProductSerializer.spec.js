const { expect } = require('chai');
const ProductSerializer = require('src/interfaces/http/presentation/product/ProductSerializer');

describe('Interfaces :: Http :: Presentation :: Product :: ProductSerializer', () => {
    describe('#serializeProduct', () => {

        context('when serialize a product created', () => {

            let productSerializer, productSerialized, productFromDatabase;

            before(() => {

                productSerialized = {
                    id: 9,
                    name: 'SomeProduct',
                    status: 'created'
                };

                productFromDatabase = {
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: null,
                    lastTimeSold: null,
                    created_at: '2020-10-13T11:55:15.522Z',
                };

                productSerializer = ProductSerializer();
            });

            it('returns product name and status', () => {

                const response = productSerializer.create(productFromDatabase);
                expect(response).to.deep.equal(productSerialized);

            });
        });

        context('when serialize a unique product request', () => {

            let productSerializer, productSerialized, productFromDatabase;

            before(() => {

                productSerialized = [{
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                }];

                productFromDatabase = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                }];

                productSerializer = ProductSerializer();
            });

            it('returns product name, valueUnitary, amount, lastPriceSold and lastTimeSold ', () => {

                const response = productSerializer.getOne(productFromDatabase);
                expect(response).to.deep.equal(productSerialized);

            });
        });

        context('when serialize more than one product request', () => {

            let productSerializer, productSerialized, productFromDatabase;

            before(() => {

                productSerialized = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                },
                {
                    id: 10,
                    name: 'AnotherProduct',
                    valueUnitary: 999,
                    amount: 99,
                }];

                productFromDatabase = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                },
                {
                    id: 10,
                    name: 'AnotherProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                }];

                productSerializer = ProductSerializer();
            });

            it('returns products name, valueUnitary and amount', () => {

                const response = productSerializer.getAll(productFromDatabase);
                expect(response).to.deep.equal(productSerialized);

            });
        });

        context('when serialize product request with price range', () => {

            let productSerializer, productSerialized, productFromDatabase;

            before(() => {

                productSerialized = [{
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                },
                {
                    name: 'AnotherProduct',
                    valueUnitary: 999,
                    amount: 99,
                }];

                productFromDatabase = [{
                    id: 9,
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                },
                {
                    id: 10,
                    name: 'AnotherProduct',
                    valueUnitary: 999,
                    amount: 99,
                    lastPriceSold: 999,
                    lastTimeSold: '2020-10-15T11:50:15.522Z',
                    created_at: '2020-10-13T11:55:15.522Z',
                }];

                productSerializer = ProductSerializer();
            });

            it('returns products name, valueUnitary and amount', () => {

                const response = productSerializer.search(productFromDatabase);
                expect(response).to.deep.equal(productSerialized);

            });
        });
    });
});
