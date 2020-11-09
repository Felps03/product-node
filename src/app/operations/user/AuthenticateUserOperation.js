class AuthenticateUserOperation {
    constructor({
        userRepository,
        logger,
        generateUserToken,
        generateHash,
        exception
    }) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.generateUserToken = generateUserToken;
        this.exception = exception;
        this.generateHash = generateHash;
    }

    async execute({ email, password }) {
        try {
            const userReturned = await this.userRepository.authenticate(email);
            if (!userReturned)
                throw this.exception.badRequest('Invalid Email');

            if (!await this.generateHash.validate(password, userReturned.password))
                throw this.exception.badRequest('Invalid Password');

            return { userReturned, token: this.generateUserToken.generate({ id: userReturned.id }) };

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}

module.exports = AuthenticateUserOperation;