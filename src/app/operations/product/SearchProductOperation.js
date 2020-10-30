class SearchProductOperation {
    constructor({
        productRepository,
        logger,
    }) {
        this.productRepository = productRepository;
        this.logger = logger;
    }

    async execute(query) {
        try {

            return await this.productRepository.search(query);

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}

module.exports = SearchProductOperation;