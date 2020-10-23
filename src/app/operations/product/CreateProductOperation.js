class CreateProductOperation {
    constructor({
        productRepository,
        logger,
    }) {
        this.productRepository = productRepository;
        this.logger = logger;
    }

    async execute(productData) {
        try {

            return await this.productRepository.create(productData);

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}

module.exports = CreateProductOperation;