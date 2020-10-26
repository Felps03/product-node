module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.purchaseSchema.create,
            },
            handler: ctx.purchaseController.createPurchase
        }
    ];
};