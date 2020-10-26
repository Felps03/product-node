const { PRICES } = require('src/domain/services/products/ProductsConstants')();

class ProductRepository {
    constructor({ productModel }) {
        this.productModel = productModel;
    }

    async create(data) {

        return await this.productModel.create(data);
    }

    async get(data) {

        return await this.productModel.find(data);
    }

    async search({ min_price = 0, max_price = PRICES.MAX_PRICE }) {

        return await this.productModel.find({ valueUnitary: { $gte: min_price, $lte: max_price } });

    }

    async update({productId, totalPrice}) {
        
        return await this.productModel.findOneAndUpdate(
            {id: productId}, 
            {   lastPriceSold: totalPrice, 
                lastTimeSold: Date.now(),
                $inc: {amount: -1}
            });
    }
}

module.exports = ProductRepository;
