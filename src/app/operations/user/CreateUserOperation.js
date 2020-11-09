const DUPLICATED_KEY = 11000;


class CreateUserOperation {
    constructor({
        userRepository,
        logger,
        generateUserToken,
        exception,
    }) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.generateUserToken = generateUserToken;
        this.exception = exception;
    }

    async execute(user) {
        try {

            let userReturned = await this.userRepository.create(user);
            return { userReturned, token: this.generateUserToken.generate({ id: userReturned.id }) };

        } catch (error) {
            this.logger.error(error);

            if (error.code == DUPLICATED_KEY)
                throw this.exception.badRequest('E-mail already used')

            throw error;
        }
    }
}

module.exports = CreateUserOperation;