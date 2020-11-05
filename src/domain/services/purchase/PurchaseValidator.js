const { TAXES: { SELIC: { VALUE, START_INSTALLMENTS, PERCENT } } } = require('src/domain/services/purchase/PurchaseConstants')();

module.exports = ({ exception }) => ({

    validate: ({ paymentCondition }, productFromDatabase) => {

        const { inputValue, numberOfInstallments } = paymentCondition;

        let totalPrice = 0;

        if (!productFromDatabase.length)
            throw exception.badRequest(['Product unavailable']);

        const { valueUnitary, amount, id } = productFromDatabase.shift();

        const installmentValue = (valueUnitary / numberOfInstallments);
        const taxValue = (valueUnitary * VALUE);

        if (!amount)
            throw exception.badRequest(['Sold Out']);

        if (inputValue < valueUnitary)
            throw exception.badRequest(['Insufficient funds']);


        const installments = new Array(numberOfInstallments).fill().map((e, i) => {
            return numberOfInstallments >= START_INSTALLMENTS ?
                {
                    numberOfInstallment: i + 1,
                    value: parseFloat((installmentValue + taxValue).toFixed(2)),
                    monthlyInterestRate: PERCENT
                } :
                {
                    numberOfInstallment: i + 1,
                    value: parseFloat(installmentValue.toFixed(2))
                };
        });

        return {
            productId: id,
            paymentCondition,
            installments: installments,
            totalPrice: installments.reduce((acc, act) => acc + act.value, totalPrice)
        };
    }
});
