class SearchProductOperation {
    constructor({
        productRepository,
        logger,
    }) {
        this.productRepository = productRepository;
        this.logger = logger;
    }

    async execute(range) {
        try {

            return await this.productRepository.search(range);

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}

module.exports = SearchProductOperation;