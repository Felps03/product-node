const {expect} = require('chai');
const PurchaseConstants = require('src/domain/services/purchase/PurchaseConstants');


describe('Domain :: Services :: Purchase :: PurchaseConstants', () => {
    let purchaseConstants, data;
    context('When PurchaseConstants is requested', ()=>{
    
        beforeEach(() =>{
            data = {
                MAX_INSTALLMENTS: 24,
                TAXES: {
                    SELIC: {
                        START_INSTALLMENTS: 7,
                        VALUE: 0.0225,
                        PERCENT: '2.25%'
                    }
                },
            };
            purchaseConstants = PurchaseConstants();      
        });

        it('should be an object with purchase constants', () =>{
  
            expect(purchaseConstants).to.deep.equal(data);
        });
    });
});