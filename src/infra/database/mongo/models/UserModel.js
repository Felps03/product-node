'use strict';
const { Schema } = require('mongoose');
const autoincrement = require('simple-mongoose-autoincrement');

module.exports = ({ providerConnection, config, generateHash }) => {
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

    return connection.model(config.db.collections.user.name, userSchema);
};