module.exports = ({ config }) => {

    const options = {
        swaggerDefinition: {
            // Like the one described here: https://swagger.io/specification/#infoObject
            info: {
                title: config.serviceName,
                description: 'This is the "Product-Node" API reference. The API allows users to save products in stock and sell them.'
            },
            basePath: '/api',
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            },
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
                        prevPage: { type: ['boolean', 'null'], example: null },
                        nextPage: { type: ['boolean', 'null'], example: true }
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
                UserAuthenticate:
                {
                    type: 'object',
                    properties:
                    {
                        email: { type: 'string', example: 'Linus.Torvalds@linux.com' },
                        password: { type: 'string', example: 'SomeStrongPassword' }
                    }
                },
                UserAuthenticateResponse:
                {
                    type: 'object',
                    properties:
                    {
                        name: { type: 'string', example: 'Linus.Torvalds' },
                        token: { type: 'string', example: 'iyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjA0NTkxOTYxLCJleHAiOjE2MDQ2NzgzNjF9.8X9gkLGdlLRgq0kzzeZr9gPv3oZ5WCAMhmsu__HDTpg' }
                    }
                },
                UserRegister:
                {
                    type: 'object',
                    properties:
                    {
                        name: { type: 'string', example: 'Linus Torvalds' },
                        email: { type: 'string', example: 'Linus.Torvalds@linux.com' },
                        password: { type: 'string', example: 'SomeStrongPassword' }
                    }
                },
                UserRegisterResponse:
                {
                    type: 'object',
                    properties:
                    {
                        id: { type: 'number', example: 1 },
                        name: { type: 'string', example: 'Linus Torvalds' },
                        token: { type: 'string', example: 'iyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjA0NTkxOTYxLCJleHAiOjE2MDQ2NzgzNjF9.8X9gkLGdlLRgq0kzzeZr9gPv3oZ5WCAMhmsu__HDTpg' }
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
                },
                BadRequestUnauthorized:
                {
                    type: 'object',
                    properties:
                    {
                        message: { type: 'string', example: 'Unauthorized' },
                        status_code: { type: 'integer', example: 401 },
                        error_code: { type: 'integer', example: 401 },
                        details: { type: 'string', example: 'No token provided' }
                    }
                }, 
                BadRequest:
                {
                    type: 'object',
                    properties:
                    {
                        message: { type: 'string', example: 'Bad Request' },
                        status_code: { type: 'integer', example: 400 },
                        error_code: { type: 'integer', example: 400 },
                        details: { type: 'string', example: 'Message about the error' }
                    }
                }
            }
        },
        // List of files to be processes. You can also set globs './routes/*.js'
        apis: ['src/interfaces/http/presentation/**/*.js'],
    };
    return options;
};