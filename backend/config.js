const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
})

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 8081,
    SWAGGER_PORT : process.env.SWAGGER_PORT || 8080,
    DATABASE : process.env.DATABASE || 'mongodb://localhost:27017/memesDB'
}