'use strict';
const { Schema } = require('mongoose');
const autoincrement = require('simple-mongoose-autoincrement');
const bcrypt = require('bcrypt');


module.exports = ({ providerConnection, config }) => {
    const connection = providerConnection.connection;

    const userSchema = new Schema({
        id: {
            type: Number,
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }, { versionKey: false, timestamps: true });

    userSchema.plugin(autoincrement, { field: 'id' });

    userSchema.pre('save', async function(next){
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    });

    return connection.model(config.db.collections.user.name, userSchema);
};