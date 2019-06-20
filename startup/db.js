const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

//Conexao com o mongoose
module.exports = function () {
    const db = config.get('db')
    mongoose.set('useCreateIndex', true)
    mongoose.connect(db, {useNewUrlParser: true})
    .then(()=> winston.info(`Connected To ${db}...`))
};