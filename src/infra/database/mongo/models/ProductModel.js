'use strict';
const  { Schema } = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const autoincrement = require('simple-mongoose-autoincrement');



module.exports = ({ providerConnection, config }) => {
    const connection = providerConnection.connection;

    const productSchema = new Schema({
        id: {
            type: Number,
        },
        name:{
            type: String,
            required: true
        },
        valueUnitary: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        lastPriceSold: {
            type: Number,
            default: null
        },
        lastTimeSold: {
            type: Date,
            default: null
        }
    }, { versionKey: false, timestamps: true });

    productSchema.plugin(autoincrement, {field: 'id'});

    paginate.paginate.options = {
        lean:  false,
        limit: 10
      };

    productSchema.plugin(paginate);
    

    return connection.model(config.db.collections.product.name, productSchema);
};