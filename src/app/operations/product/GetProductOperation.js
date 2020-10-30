class GetProductOperation {
    constructor({
        productRepository,
        logger,
    }) {
        this.productRepository = productRepository;
        this.logger = logger;
    }

    async execute({ params, query: { page } }) {
        try {

            return await this.productRepository.get(params, page);

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}

module.exports = GetProductOperation;