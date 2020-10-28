const { TAXES:{SELIC:{ VALUE, START_INSTALLMENTS, PERCENT}} } = require('src/domain/services/purchase/PurchaseConstants')();

module.exports = () => ({

    validate: ({ paymentCondition }, productFromDatabase) => {

        const { inputValue, numberOfInstallments } = paymentCondition;
        const { valueUnitary, amount, id } = productFromDatabase.shift();

        const installmentValue = (valueUnitary / numberOfInstallments);
        const taxValue = (valueUnitary * VALUE);

        let totalPrice = 0;
        let installments = [];


        if (!amount)
            return new Error('Sold out');

        if (inputValue < valueUnitary)
            return new Error('Insufficient funds');


        for (let i = 1; i <= numberOfInstallments; i++) {
            numberOfInstallments >= START_INSTALLMENTS ?
                installments.push(
                    {
                        numberOfInstallment: i,
                        value: parseFloat((installmentValue + taxValue).toFixed(2)),
                        monthlyInterestRate: PERCENT
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
