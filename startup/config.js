const config = require('config')

module.exports = function (){
    //in case enviroment variable is not defined
if(!config.get('jwtPrivateKey')){
    throw new Error ('FATAL ERROR: jwtPrivateKey is not defined')
    }
}