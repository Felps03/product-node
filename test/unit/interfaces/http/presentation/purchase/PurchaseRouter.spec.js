const { expect } = require('chai');
const PurchaseRouter = require('src/interfaces/http/presentation/purchase/PurchaseRouter');

describe('Interfaces :: Http :: Presentation :: Purchase :: PurchaseRouter', () => {
    context('when purchase routes are requested by Router', () => {
        let purchaseRouter, container, arrayWithRoutes;

        before(() => {

            arrayWithRoutes = [
                {
                  method: 'post',
                  path: '/',
                  validation: { body: null },
                  handler: null
                }
              ]
            container = {
                cradle: {
                    purchaseSchema:{
                        create: null
                    },
                    purchaseController:{
                        createPurchase: null,
                    }
                }
            }
            purchaseRouter = PurchaseRouter({container});
        });

        it('return an array with routes data', async () => {
            expect(purchaseRouter).to.deep.equal(arrayWithRoutes);
        });
    });
});