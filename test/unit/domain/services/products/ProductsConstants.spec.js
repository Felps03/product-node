const {expect} = require('chai');
const ProductsConstants = require('src/domain/services/products/ProductsConstants');


describe('Domain :: Services :: Products :: ProductsConstants', () => {
    
    let productsConstants, data;
    
    context('When ProductsConstants is requested', ()=>{
    
        beforeEach(() =>{
            data = {
                PRICES: {
                    MAX_PRICE: 9999999999,
                    MIN_PRICE: 0.01
                },
                NAME:{
                    MIN_LENGTH: 1,
                    MAX_LENGTH: 30
                }, 
                AMOUNT:{
                    MIN_AMOUNT: 1,
                    MAX_AMOUNT: 999999
                }
            };
            productsConstants = ProductsConstants();      
        });

        it('should be an object with products constants', () =>{
  
            expect(productsConstants).to.deep.equal(data);
        });
    });
});