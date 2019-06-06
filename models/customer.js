const mongoose = require("mongoose");
const Joi = require('joi');

//customer Schema
    const customerSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
        },
        phone:{
            type: Number,
            required: true,
            minlength: 8,
            maxlength: 30
        },
        address:{
            type: String,
            required: true,
            minlength: 0,
            maxlength: 255,
        }
    })

//Mongoose Model
    const Customers = mongoose.model('Customer', customerSchema)

//Validate Joi
    function customerValidate(customer){
        const schema = {
            name: Joi.string().min(5).max(50).required(),
            phone: Joi.number().min(8).required(),
            address: Joi.string().min(0).max(255).required(),
        }
        return Joi.validate(customer, schema);
    }

//Export CustomerSchema    
exports.Customers = Customers;
exports.customerSchema = customerSchema;
exports.validate = customerValidate;