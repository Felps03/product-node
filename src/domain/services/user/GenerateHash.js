const bcrypt = require('bcrypt');

module.exports =  () => ({

    generate:  (password) => {
        return  bcrypt.hash(password, 10);;
    },

    validate: (password, hash) => {

        return  bcrypt.compare(password, hash);
                
    }
});

