class AuthMiddleware {
    constructor({
        logger,
        generateUserToken,
        exception,
    }) {
        this.logger = logger;
        this.generateUserToken = generateUserToken;
        this.exception = exception;
    }

    async execute(authorization) {
        try {
            
            if(!authorization)
                throw this.exception.unauthorized('No token provided');

            const parts = authorization.split(' ');

            const token = parts.pop();

            if (!this.generateUserToken.validate(token))
                throw this.exception.unauthorized('Invalid Token');

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}

module.exports = AuthMiddleware;