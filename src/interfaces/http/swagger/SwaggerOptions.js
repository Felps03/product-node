module.exports = ({ config }) => {

    const options = {
        swaggerDefinition: {
            // Like the one described here: https://swagger.io/specification/#infoObject
            info: {
                title: config.serviceName,
                description: 'Swagger doc'
            },
            basePath: '/api'
        },
        // List of files to be processes. You can also set globs './routes/*.js'
        apis: ['src/interfaces/http/presentation/**/*.js'],
    };
    return options;
};