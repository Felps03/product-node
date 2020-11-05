const bcrypt = require('bcrypt');

class AuthenticateUserOperation {
    constructor({
        userRepository,
        logger,
        generateUserToken,
        exception
    }) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.generateUserToken = generateUserToken;
        this.exception = exception;
    }

    async execute({ email, password }) {
        try {
            const userReturned = await this.userRepository.authenticate(email);
            if (!userReturned)
                throw this.exception.badRequest('Invalid Email');

            if (!await bcrypt.compare(password, userReturned.password))
                throw this.exception.badRequest('Invalid Password');

            return { userReturned, token: this.generateUserToken.generate({ id: userReturned.id }) };

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}

module.exports = AuthenticateUserOperation;