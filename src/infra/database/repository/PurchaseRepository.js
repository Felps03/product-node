class PurchaseRepository {
    constructor({ purchaseModel }) {
        this.purchaseModel = purchaseModel;
    }

    async create(data) {

        return await this.purchaseModel.create(data);
    }
}

module.exports = PurchaseRepository;