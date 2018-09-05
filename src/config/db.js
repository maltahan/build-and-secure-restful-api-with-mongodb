const mongoose = require('mongoose');
const { getConfig } =require('./config');
//mongoose.Promise = global.Promise;
//const connect = () => mongoose.connect('mongodb://localhost:27017/music_api', {useNewUrlParser:true});
//module.exports = connect;



const config = getConfig(process.env.NODE_ENV);
mongoose.Promise = global.Promise;
const connect = () => mongoose.connect(config.MONGO_URI);
module.exports = connect;