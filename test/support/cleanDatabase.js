const cleanDatabase = async (providerConnection) => {
    const conn = await providerConnection.connect();
    for (const collection of Object.keys(conn.collections)) {
        await conn.collections[collection].deleteMany({});
    }
};
module.exports = cleanDatabase;
