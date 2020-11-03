class CreatePurchaseOperation {
    constructor({
        purchaseRepository,
        productRepository,
        purchaseValidator,
        logger,
        exception
    }) {
        this.purchaseRespository = purchaseRepository;
        this.productRepository = productRepository;
        this.purchaseValidator = purchaseValidator;
        this.logger = logger;
        this.exception = exception;
    }

    async execute(purchaseData) {
        const { product } = purchaseData;

        const productFromDatabase = await this.productRepository.get({ id: product });
        const purchaseApproved = this.purchaseValidator.validate(purchaseData, productFromDatabase.docs);            

        await this.productRepository.update(purchaseApproved);
        return await this.purchaseRespository.create(purchaseApproved);

    }
}

module.exports = CreatePurchaseOperation;