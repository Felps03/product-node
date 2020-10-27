module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        /**
         * @swagger
         * 
         *  /purchase:
         *    post:
         *      tags:
         *      - "purchase"
         *      summary: "Buy a product"
         *      description: "This route should be use to buy a product"
         *      produces:
         *      - "application/json"
         *      parameters:
         *      - name: "body"
         *        in: "body"
         *        description: "Purchase object"
         *        required: true
         *        schema: 
         *          $ref: "#/definitions/Product"
         *      responses:
         *        "200":
         *          description: "OK"
         *          schema:
         *            type: "array"
         *            items:
         *              $ref: "#/definitions/InstallmentsReturned"
         *        "400":
         *          description: "Bad Request"          
         */
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