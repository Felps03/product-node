
class CreateUserOperation {
    constructor({
        userRepository,
        logger,
        generateUserToken,
    }) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.generateUserToken = generateUserToken;
    }

    async execute(user) {
        try {

            let userReturned = await this.userRepository.create(user);
            return { userReturned, token: this.generateUserToken.generate({ id: userReturned.id }) };

        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}

module.exports = CreateUserOperation;