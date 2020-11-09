class UserRepository {
    constructor({ userModel, generateHash }) {
        this.userModel = userModel;
        this.generateHash = generateHash;
    }

    async create(data) {
        
        data.password = await this.generateHash.generate(data.password);

        return await this.userModel.create(data);
    }

    async authenticate(email){
        return await this.userModel.findOne({email:email});
    }

}

module.exports = UserRepository;
