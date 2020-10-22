const { expect } = require('chai');
const PurchaseSchema = require('src/interfaces/http/presentation/purchase/PurchaseSchema');

describe('Interfaces :: Http :: Presentation :: Purchase :: PurchaseSchema', () => {
    context('when purchase schema validation is requested by middleware', () => {
        let purchaseSchema;

        before(() => {
            purchaseSchema = PurchaseSchema();
        });

        it('return object with joi validations', async () => {

            expect(purchaseSchema).to.haveOwnProperty('create');
        });
    });
});