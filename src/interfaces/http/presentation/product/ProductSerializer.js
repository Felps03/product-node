module.exports = () => ({
    create: ({ id, name }) => {

        return { id, name, status: 'created' };
    },
    getOne: ({ docs }) => {


        return docs.map((product) => {
            const { id, name, valueUnitary, amount, lastPriceSold, lastTimeSold } = product;
            return { id, name, valueUnitary, amount, lastPriceSold, lastTimeSold };
        });
    },
    getAll: (products) => {

        let { docs } = products;

        products.docs = docs.map((product) => {
            const { id, name, valueUnitary, amount } = product;
            return { id, name, valueUnitary, amount };
        });

        return products;
    },
    search: (products) => {

        let { docs } = products;

        products.docs = docs.map((product) => {
            const { name, valueUnitary, amount } = product;
            return { name, valueUnitary, amount };
        });

        return products;
    }
});
