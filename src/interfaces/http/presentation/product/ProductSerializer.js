module.exports = () => ({
    create: ({id, name}) => {

        return { id, name, status: 'created' };
    },
    getOne: (products) => {


        return products.map((product) => {
            const { name, valueUnitary, amount, lastPriceSold, lastTimeSold } = product;
            return { name, valueUnitary, amount, lastPriceSold, lastTimeSold };
        });
    },
    getAll: (products) => {


        return products.map((product) => {
            const { id, name, valueUnitary, amount } = product;
            return { id, name, valueUnitary, amount };
        });
    },
    search: (products) => {

        return products.map((product) => {
            const { name, valueUnitary, amount } = product;
            return { name, valueUnitary, amount };
        });
    }
});
