const mongoose = require('mongoose');
const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models/rental')
const {Customers} = require('../models/customer')
const {Car} = require('../models/cars')

//GET
    router.get('/', async (req, res)=>{
        const rentals = await Rental.find().sort('-dateOut')
        res.send(rentals)
    })

//POST
    router.post('/', auth, async (req,res)=>{
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message)

        const customer = await Customers.findById(req.body.customerId)
        if(!customer) return res.status(404).send('Customer is Not Found')

        const cars = await Car.findById(req.body.carId)
        if(!cars) return res.status(404).send('Car is Not Found')

        let rental = new Rental ({
            customer:{
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
                address: customer.address
            },
            cars:{
                _id: cars._id,
                name: cars.name,
                year: cars.year,
                color: cars.color,
                licensePlate: cars.licensePlate,
                isRented: cars.isRented,
            }
        })
    cars.isRented = true;
    cars.save();
    await rental.save() 
    res.send(rental);
})

//DELETE
    router.post('/', auth, async (res, req)=>{
        const rental = Rental.findByIdAndRemove(req.body)
        if(!rental) return res.status(404).send("Rental ID is Not Found")
})


module.exports = router;


