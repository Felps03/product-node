const {expect, spy} = require('chai');
const ProductRepository = require('src/infra/database/repository/ProductRepository');


describe('Infra :: Database :: Repository :: ProductRepository', () => {
    let  productRequested, productFromDatabase, productRepository, productModel, query, totalPrice;
    context('When product is created with success', ()=>{
    
        beforeEach(() =>{
            productFromDatabase = [{
                id: 9,
                name: 'SomeProduct',
                valueUnitary: 999,
                amount: 99,
                lastPriceSold: 999,
                lastTimeSold: '2020-10-15T11:50:15.522Z',
                created_at: '2020-10-13T11:55:15.522Z',
            }];

            productModel = {
                create: () => Promise.resolve(productFromDatabase)
            };

            productRequested = {
                    name: 'SomeProduct',
                    valueUnitary: 999,
                    amount: 99,
                };
            spy.on(productModel, 'create');
            productRepository = new ProductRepository({productModel});      
        });

        it(' returns full object from database', async () =>{

            const response = await productRepository.create(productRequested);        
            expect(productModel.create).to.be.called.once.with.exactly(productRequested);
            expect(response).to.deep.equal(productFromDatabase);  
        });
    });

    context('When a product request is made with success', ()=>{
    
        beforeEach(() =>{
            productFromDatabase = [{
                id: 9,
                name: 'SomeProduct',
                valueUnitary: 999,
                amount: 99,
                lastPriceSold: 999,
                lastTimeSold: '2020-10-15T11:50:15.522Z',
                created_at: '2020-10-13T11:55:15.522Z',
            }];

            productModel = {
                find: () => Promise.resolve(productFromDatabase)
            };

            productRequested = {
                    id: 9
                };
            spy.on(productModel, 'find');
            productRepository = new ProductRepository({productModel});      
        });

        it(' returns full object from database', async () =>{

            const response = await productRepository.get(productRequested);        
            expect(productModel.find).to.be.called.once.with.exactly(productRequested);
            expect(response).to.deep.equal(productFromDatabase);  
        });
    });

    context('When a product request with range filter is made with success', ()=>{
    
        beforeEach(() =>{
            productFromDatabase = [{
                id: 9,
                name: 'SomeProduct',
                valueUnitary: 500,
                amount: 99,
                lastPriceSold: 500,
                lastTimeSold: '2020-10-15T11:50:15.522Z',
                created_at: '2020-10-13T11:55:15.522Z',
            }];

            productModel = {
                find: () => Promise.resolve(productFromDatabase)
            };

            productRequested = {
                    min_price: 200,
                    max_price: 600
                };

            query = { valueUnitary: { $gte: productRequested.min_price, $lte: productRequested.max_price } } 

            spy.on(productModel, 'find');
            productRepository = new ProductRepository({productModel});      
        });

        it(' returns objects from database that matches with range filter ', async () =>{

            const response = await productRepository.search(productRequested);        
            expect(productModel.find).to.be.called.once.with.exactly(query);
            expect(response).to.deep.equal(productFromDatabase);  
        });
    });

    context('When a product is updated with success', ()=>{
    
        beforeEach(() =>{
            productFromDatabase = [{
                id: 9,
                name: 'SomeProduct',
                valueUnitary: 500,
                amount: 98,
                lastPriceSold: 500,
                lastTimeSold: '2020-10-15T11:50:15.522Z',
                created_at: '2020-10-13T11:55:15.522Z',
            }];

            productModel = {
                findOneAndUpdate: () => Promise.resolve(productFromDatabase)
            };

            productRequested = 9;
            totalPrice = 500;

            spy.on(productModel, 'findOneAndUpdate');
            productRepository = new ProductRepository({productModel});      
        });

        it(' returns updated object from database ', async () =>{

            const response = await productRepository.update({productRequested, totalPrice});        
            expect(productModel.findOneAndUpdate).to.be.called.once();
            expect(response).to.deep.equal(productFromDatabase);  
        });
    });

    context('when ocucurs an error', ()=> {
        let productRepository, productModel;
        before(() =>{

            productModel = {
                create: () => Promise.reject(new Error('Erro de teste'))
            };

            productRepository = new ProductRepository({productModel});
            spy.on(productModel, 'create');
        });
    
        it('throws an error',  done =>{
      
            productRepository
                .create({})
                .then(() => done('Must be an error'))
                .catch(erro =>{
                    expect(erro).to.be.exist();
                    expect(productModel.create).to.be.called.once();
                    done();
                });
        });  
    });
}); 