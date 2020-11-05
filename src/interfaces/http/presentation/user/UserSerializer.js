module.exports = () => ({
    create: ({ userReturned: { id, name }, token}) => {

        return { id, name, token };
    }, 
    authenticate: ({ userReturned: { name }, token}) => {

        return { name, token };
    }
});
