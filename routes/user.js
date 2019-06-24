const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {User, validate} = require('../models/user');
const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');


//GET
    router.get('/', auth, async(req, res) => {
        const user = await User.findById(req.user._id).select('-password')
        res.send(user);
    })

//POST
    router.post('/', async (req, res) => {
        //validação de erro
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email:req.body.email});
        if(user) return res.status(400).send('User already registered');

        //new user
        user = new User(_.pick(req.body,['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt); //hash password encrypt

        const token = user.generateAuthToken() //jsonwebtoken
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    
    })

//UPDATE
    router.put('/:id', auth, async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            isAdm: req.body.isAdm,
        },{new: true})
        
        if(!user) return res.status(404).send("The User Id is not found")
        res.send(user);
    })    

//DELETE 
    router.delete('/:id', auth, async(req, res) => {
        const user = await User.findByIdAndRemove(req.params.id)
        if(!user) return res.status(404).send("User is not found")
    })

module.exports = router;
