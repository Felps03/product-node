module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.productSchema.create,
            },
            handler: ctx.productController.createProduct
        },
        {
            method: 'get',
            path: '/search',
            validation: {
                query: ctx.productSchema.query
            },
            handler: ctx.productController.searchProduct
        },
        {
            method: 'get',
            path: '/:id',
            validation: {
                params: ctx.productSchema.params,
            },
            handler: ctx.productController.getProduct
        },
        {
            method: 'get',
            path: '/',
            validation: {
                params: ctx.productSchema.params,
            },
            handler: ctx.productController.getProduct
        }
    ];
};