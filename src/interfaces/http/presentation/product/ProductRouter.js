module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        /**
         * @swagger
         *  /products:
         *    post:
         *      tags:
         *      - "product"
         *      summary: "Add a new product to the stock"
         *      description: ""
         *      consumes:
         *      - "application/json"
         *      produces:
         *      - "application/json"
         *      parameters:
         *      - in: "body"
         *        name: "body"
         *        description: "Product object that needs to be added to the stock"
         *        required: true
         *        schema:
         *          $ref: "#/definitions/ProductInput"
         *      responses:
         *        "201":
         *          description: "Created"
         *          schema:
         *            $ref: "#/definitions/ProductResponse"
         *        "400":
         *          description: "Bad Request"
         *    get:
         *      tags:
         *      - "product"
         *      summary: "Request products in stock"
         *      description: ""
         *      consumes:
         *      - "application/json"
         *      produces:
         *      - "application/json"
         *      parameters: 
         *      - name: "page"
         *        in: "query"
         *        description: "Page number"
         *        type: "integer"        
         *      responses:
         *        "200":
         *          description: "OK"
         *          schema:   
         *            $ref: "#/definitions/FullResponse"
         *      
         *        "400":
         *          description: "Bad Request" 
         */   
        
        /**
         * @swagger
         *  /products/{id}:
         *    get:
         *      tags:
         *      - "product"
         *      summary: "Finds Product by Id"
         *      description: "This route should be use to request datails from a specific product."
         *      produces:
         *      - "application/json"
         *      parameters:
         *      - name: "id"
         *        in: "path"
         *        required: true
         *        description: "Product Id to be requested"
         *        type: "integer"
         *      responses:
         *        "200":
         *          description: "OK"
         *          schema:
         *            type: "array"
         *            items:
         *              $ref: "#/definitions/FullProduct"
         *        "400":
         *          description: "Bad Request" 
         * 
         */

        /**
         * @swagger
         *  /products/search:
         *    get:
         *      tags:
         *      - "product"
         *      summary: "Finds Product by Price Range"
         *      description: "This route should be use to request products with price range filter."
         *      produces:
         *      - "application/json"
         *      parameters:
         *      - name: "min_price"
         *        in: "query"
         *        description: "Min product price"
         *        type: "integer"
         *      - name: "max_price"
         *        in: "query"
         *        description: "Max product price"
         *        type: "integer" 
         *      - name: "page"
         *        in: "query"
         *        description: "Page number"
         *        type: "integer"        
         *      responses:
         *        "200":
         *          description: "OK"
         *          schema:
         *            $ref: "#/definitions/FullResponse"
         *        "400":
         *          description: "Invalid status value"
         */
        
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
                query: ctx.productSchema.queryPaginate
            },
            handler: ctx.productController.getProduct
        }
    ];
};