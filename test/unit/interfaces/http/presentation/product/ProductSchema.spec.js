const { expect } = require('chai');
const ProductSchema = require('src/interfaces/http/presentation/product/ProductSchema');

describe('Interfaces :: Http :: Presentation :: Product :: ProductSchema', () => {
    context('when product schema validation is requested by middleware', () => {
        let productSchema;

        before(() => {
            productSchema = ProductSchema();
        });

        it('return object with joi validations', async () => {
             
            expect(productSchema).to.haveOwnProperty('create');
            expect(productSchema).to.haveOwnProperty('params');
            expect(productSchema).to.haveOwnProperty('query');

        });
    });
});