'use strict';
const  { Schema } = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const autoincrement = require('simple-mongoose-autoincrement');



module.exports = ({ providerConnection, config }) => {
    const connection = providerConnection.connection;

    const purchaseSchema = new Schema({
        id: {
            type: Number,
        },
        productId:{
            type: Number,
            required: true
        },
        paymentCondition: {
            inputValue: {type:Number, required:true},
            numberOfInstallments: {type:Number, required:true}
        },
        installments:[{
            numberOfInstallment: {type:Number, required:true},
            value: {type:Number, required:true},
            monthlyInterestRate: {type:String, default: null}
        }]
    }, { versionKey: false, timestamps: true });

    purchaseSchema.plugin(paginate);
    purchaseSchema.plugin(autoincrement, {field: 'id'});

    return connection.model(config.db.collections.purchase.name, purchaseSchema);
};




