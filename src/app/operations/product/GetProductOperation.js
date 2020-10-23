class GetProductOperation {
    constructor({
        productRepository,
        logger,
    }) {
        this.productRepository = productRepository;
        this.logger = logger;
    }

    async execute(productId) {
        try {

            return await this.productRepository.get(productId);

        } catch (error) {
            this.logger.error(error);
            throw error
        }
    }
}

module.exports = GetProductOperation;