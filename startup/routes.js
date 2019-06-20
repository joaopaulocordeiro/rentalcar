const express = require('express');
const cars = require('../routes/cars');
const customers = require('../routes/customer');
const users = require('../routes/user');
const rental = require('../routes/rental');

module.exports = function (app){
    app.use(express.json());
    app.use('/api/cars', cars);
    app.use('/api/customers', customers);
    app.use('/api/users', users);
    app.use('/api/rentals', rental);
}