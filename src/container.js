const {
    createContainer,
    asClass,
    asFunction,
    asValue,
    InjectionMode,
    Lifetime
} = require('awilix');

//Middlewares
const Server = require('./interfaces/http/Server');
const Router = require('./interfaces/http/Router');
const swaggerOptions = require('src/interfaces/http/swagger/SwaggerOptions');

const logger = require('./interfaces/http/presentation/middlewares/logging/logger');
const HttpErrors = require('./interfaces/http/presentation/errors/HttpErrors');

const container = createContainer();

const configureContainer = config => {
    container
        .register({
            server: asClass(Server).singleton(),
            router: asFunction(Router),
            logger: asFunction(logger).singleton(),
            container: asValue(container),
            config: asValue(config),
            exception: asValue(HttpErrors),
            swaggerOptions: asFunction(swaggerOptions),
        })
        .loadModules(
            [
                'src/infra/database/mongo/provider/**/*.js',
                [
                    'src/infra/database/mongo/provider/ProviderConnection.js',
                    {
                        lifetime: Lifetime.SINGLETON
                    }
                ],
                'src/infra/integration/**/*.js',
                [
                    'src/infra/database/mongo/models/**/*.js',
                    {
                        lifetime: Lifetime.SINGLETON
                    }
                ],
                'src/infra/database/repository/**/*.js',
                'src/app/operations/**/*.js',
                'src/app/services/**/*.js',
                'src/domain/services/**/*.js',
                'src/domain/schemas/**/*.js',
                'src/interfaces/http/errors/**/*.js',
                'src/interfaces/http/constants/**/*.js',
                'src/interfaces/http/middlewares/**/*.js',
                'src/interfaces/http/presentation/**/*.js',
            ],
            {
                formatName: 'camelCase',
                resolverOptions: {
                    injectionMode: InjectionMode.PROXY
                }
            }
        );
    return container;
};

module.exports = { configureContainer, container };
