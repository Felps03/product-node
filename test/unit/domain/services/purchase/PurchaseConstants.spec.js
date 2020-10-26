const {expect} = require('chai');
const PurchaseConstants = require('src/domain/services/purchase/PurchaseConstants');


describe('Domain :: Services :: Purchase :: PurchaseConstants', () => {
    let purchaseConstants, data;
    context('When PurchaseConstants is requested', ()=>{
    
        beforeEach(() =>{
             data = {
                TAXES: {
                    SELIC: {
                        START_INSTALLMENTS: 6,
                        VALUE: 0.025,
                        PERCENT: '2.5%'
                    }
                }
            }
            purchaseConstants = PurchaseConstants();      
        });

        it('should be an object with purchase constants', () =>{
  
            expect(purchaseConstants).to.deep.equal(data);
        });
    });
});