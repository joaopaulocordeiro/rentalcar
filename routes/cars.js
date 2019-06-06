const express = require('express')
const router = express.Router();
const {Car, validate} = require('../models/cars')


//POST
router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)    
        
        const cars = new Car  ({
            name: req.body.name,
            year: req.body.year,
            color: req.body.color,
            licensePlate: req.body.licensePlate,
        })
//save car class
    await cars.save();
    res.send(cars)
});


//GET
router.get('/:id', async (req, res)=>{
    const cars = await Car.findById(req.params.id)
    if(!cars) return res.status(404).send('Car ID is not Found')
    res.send(cars);
});


//GET ALL
router.get('/', async(req, res)=>{
    const cars = await Car.find().sort('name')
    res.send(cars)
});

//UPDATE
router.put('/:id', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)
   
    const cars = await Car.findByIdAndUpdate(req.params.id, {
       name: req.body.name,
       year: req.body.year,
       color: req.body.color,
       licensePlate: req.body.licensePlate,
       isRented: req.body.isRented,

   },{new: true})
   
   if(!cars) return res.status(404).send('Car ID is not Found')
   res.send(cars);
});


//DELETE
router.delete('/:id', async(req, res)=>{
    const cars = await Car.findByIdAndRemove(req.params.id)
    res.send(cars);
});


//export to index
module.exports = router;