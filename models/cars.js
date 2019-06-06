const mongoose = require('mongoose');
const Joi = require('joi');

//SCHEMA
const carsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 0,
        maxlength: 50,
    },
    year:{
        type: Number,
        required: true,
        min: 1900,
        max: 2200,
    },
    color:{
        type: String,
        required: true,
        minlength:0,
        maxlength: 20,
    },
    licensePlate:{
        type: String,
        required: true,
        minlength: 0,
        maxlength: 255,
    },
    isRented:{
        type: Boolean,
        default:false,
    }
    
})

const Car = mongoose.model('Cars', carsSchema)

function validateCars(car){
    const schema = {
        name: Joi.string().min(0).max(50).required(),
        year: Joi.number().min(1900).max(2200).required(),
        color: Joi.string().min(0).max(20).required(),
        licensePlate: Joi.string().min(0).max(255).required(),
    }

    return Joi.validate(car, schema)   
}

exports.Car = Car;
exports.validate = validateCars;
exports.carsSchema = carsSchema;