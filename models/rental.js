const mongoose = require('mongoose')
const Joi = require('Joi')
const moment = require('moment')
const customerSchema = require('../models/customer')
const carsSchema = require('../models/cars')


const rentalSchema = new mongoose.Schema({
    customer:{ 
        type: customerSchema,
        required:true,
    },
    cars:{
        type:carsSchema,
        required:true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    }
})


rentalSchema.methods.return = function(){
    this.dateReturned = new Date();
}

const Rental = mongoose.model('Rental', rentalSchema)



function validateRental(rental) {
    const schema = {
      customerId: Joi.string().required(),
      carId: Joi.string().required()
    };
  
    return Joi.validate(rental, schema);
  }

exports.Rental = Rental;
exports.validate = validateRental;