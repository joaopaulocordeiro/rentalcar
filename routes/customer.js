const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {Customers, validate} = require('../models/customer');

//POST
    router.post('/', auth, async (req, res)=>{
        //validação de erro
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const customer = new Customers({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
        });
            await customer.save();
            res.send(customer);
    });

//GET
    router.get('/:id', async(res, req)=>{
        const customer = await Customers.findById(req.params.id);
        if(!customer) return res.status(404).send("Customer ID is not Found...");

    });

//GET ALL
    router.get('/', async (res, req)=>{
        const customer = await Customers.find().sort('name');
        res.send(customer);
    });


//DELETE
    router.delete('/:id', auth, async (res, req)=>{
        const customer = await Customers.findByIdAndRemove(req.params.id);
        if(!customer) return res.status(404).send("Customer ID is not Found...");
    });






//export to index
    module.exports = router;