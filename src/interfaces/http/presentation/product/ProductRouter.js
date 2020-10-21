module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        /**
         * @swagger
         *  products/:
         *   post:
         *      tags:
         *          - Product
         *      summary: This should create a product.
         *      consumes:
         *        - application/json
         *      responses:
         *        200:
         *          description: Product created with success.
         *        400:
         *          description: Bad Request.
         *        412:
         *          description: Invalid Values.    
         */
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.productSchema.create,
            },
            handler: ctx.productController.createProduct
        },
    ];
};