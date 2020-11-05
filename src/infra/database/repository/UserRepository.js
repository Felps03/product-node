class UserRepository {
    constructor({ userModel }) {
        this.userModel = userModel;
    }

    async create(data) {

        return await this.userModel.create(data);
    }

    async authenticate(email){
        return await this.userModel.findOne({email:email});
    }

}

module.exports = UserRepository;
