class CreateProductOperation {
    constructor({
        productRepository,
        logger,
    }) {
        this.productRepository = productRepository;
        this.logger = logger;
    }

    async execute({product}) {
        try {

            return await this.productRepository.create(product);

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}

module.exports = CreateProductOperation;