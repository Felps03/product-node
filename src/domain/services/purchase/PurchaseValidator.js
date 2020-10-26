const { TAXES } = require('src/domain/services/purchase/PurchaseConstants')();

module.exports = () => ({

    validate: (purchaseData, productFromDatabase) => {
        const { paymentCondition } = purchaseData;
        const { inputValue, numberOfInstallments } = paymentCondition;
        const { valueUnitary, amount, id } = productFromDatabase[0];
        const installmentValue = (valueUnitary / numberOfInstallments);
        const taxValue = (valueUnitary * TAXES.SELIC.VALUE);

        let totalPrice = 0;
        let installments = [];


        if (!amount)
            return new Error('Sold out');

        if (inputValue < valueUnitary) 
            return new Error('Insufficient funds');


        for (let i = 1; i <= numberOfInstallments; i++) {
            numberOfInstallments >= TAXES.SELIC.START_INSTALLMENTS ?
                installments.push(
                    {
                        numberOfInstallment: i,
                        value: parseFloat((installmentValue + taxValue).toFixed(2)),
                        monthlyInterestRate: TAXES.SELIC.PERCENT
                    }) :
                installments.push(
                    {
                        numberOfInstallment: i,
                        value: parseFloat(installmentValue.toFixed(2))
                    });
            totalPrice += installments[i - 1].value;
        }

        return {
            productId: id,
            paymentCondition,
            installments: installments,
            totalPrice
        };
    }
});
