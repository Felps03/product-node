module.exports = () => ({
    create: ({ installments }) => {

        return installments.map((installment) => {

            const { value, numberOfInstallment, monthlyInterestRate } = installment;

            return (!monthlyInterestRate) ?
                { value, numberOfInstallment } :
                { value, numberOfInstallment, monthlyInterestRate };
        });
    }
});    