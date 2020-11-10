const { TAXES: { SELIC: { VALUE, START_INSTALLMENTS, PERCENT } } } = require('src/domain/services/purchase/PurchaseConstants')();

module.exports = ({ exception }) => ({

    validate: ({ paymentCondition }, productFromDatabase) => {

        if (!productFromDatabase.length)
            throw exception.badRequest(['Product unavailable']);

        let totalPrice = 0;
        const { inputValue, numberOfInstallments } = paymentCondition;
        const { valueUnitary, amount, id } = productFromDatabase.shift();
        const installmentValue = (valueUnitary / numberOfInstallments);
        const taxValue = (valueUnitary * VALUE);

        if (!amount)
            throw exception.badRequest(['Sold Out']);

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

        totalPrice = parseFloat(installments.reduce((acc, act) => acc + act.value, totalPrice).toFixed(2));

        if (inputValue < totalPrice)
            throw exception.badRequest([`Insuffient Funds - Total price for ${numberOfInstallments} installments is ${totalPrice}`]);

        return {
            productId: id,
            paymentCondition,
            installments: installments,
            totalPrice
        };
    }
});
