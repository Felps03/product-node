const cleanDatabase = async (providerConnection) => {
    const conn = await providerConnection.connect();
    conn.dropDatabase();
};

module.exports = cleanDatabase;
