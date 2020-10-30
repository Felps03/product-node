module.exports = ({ config }) => {

    const options = {
        swaggerDefinition: {
            // Like the one described here: https://swagger.io/specification/#infoObject
            info: {
                title: config.serviceName,
                description: 'This is the "Product-Node" API reference. The API allows users to save products in stock and sell them.'
            },
            basePath: '/api',
            definitions: {
                Installments:
                {
                    type: 'object',
                    properties:
                    {
                        inputValue: { type: 'integer', example: 99 },
                        numberOfInstallments: { type: 'integer', example: 1 }
                    }
                },
                InstallmentsReturned:
                {
                    type: 'object',
                    properties:
                    {
                        value: { type: 'integer', example: 99 },
                        numberOfInstallment: { type: 'integer', example: 1 },
                        monthlyInterestRate: { type: 'string', example: '2.5%' }
                    }
                },
                FullResponse: {
                    type: 'object',
                    properties: {
                        docs: { type: 'array', items: { '$ref': '#/definitions/SmallProduct' } },
                        totalDocs: { type: 'integer', example: 40 },
                        limit: { type: 'integer', example: 10 },
                        totalPages: { type: 'integer', example: 3 },
                        page: { type: 'integer', example: 1 },
                        pagingCounter: { type: 'integer', example: 1 },
                        hasPrevPage: { type: 'boolean', example: false },
                        hasNextPage: { type: 'boolean', example: true },
                        prevPage: { type: ['boolean','null'], example: null },
                        nextPage:  { type: ['boolean','null'], example: true }
                    }
                },
                FullProduct:
                {
                    type: 'object',
                    properties:
                    {
                        name: { type: 'string', example: 'Notebook Node' },
                        valueUnitary: { type: 'integer', example: 1249 },
                        amount: { type: 'integer', example: 342 },
                        lastPriceSold: { type: 'integer', example: 342 },
                        lastTimeSold: { type: 'string', example: '2020-10-27T16:25:01.624' }
                    }
                },
                SmallProduct:
                {
                    type: 'object',
                    properties:
                    {
                        name: { type: 'string', example: 'Notebook Node' },
                        valueUnitary: { type: 'integer', example: 1249 },
                        amount: { type: 'integer', example: 342 }
                    }
                },
                ProductInput:
                {
                    type: 'object',
                    required: ['product'],
                    properties: { product: { '$ref': '#/definitions/ProductInformation' } }
                },
                ProductInformation:
                {
                    type: 'object',
                    properties:
                    {
                        name: { type: 'string', example: 'Keyboard Premium' },
                        valueUnitary: { type: 'integer', example: 79 },
                        amount: { type: 'integer', example: 280 }
                    }
                },
                ProductResponse:
                {
                    type: 'object',
                    properties:
                    {
                        id: { type: 'integer', example: 9 },
                        name: { type: 'string', example: 'Keyboard Premium' },
                        status: { type: 'string', example: 'created' }
                    }
                },
                Product:
                {
                    type: 'object',
                    required: ['product', 'paymentCondition'],
                    properties:
                    {
                        product: { type: 'integer', example: 1 },
                        paymentCondition: { '$ref': '#/definitions/Installments' }
                    }
                }
            }
        },
        // List of files to be processes. You can also set globs './routes/*.js'
        apis: ['src/interfaces/http/presentation/**/*.js'],
    };
    return options;
};