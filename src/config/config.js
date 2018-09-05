//const devConfig = { secret: 'I_AM_MOHAMMAD'};

//module.exports = devConfig;

const config = {
    production: {
        secret: process.env.secret,
        MONGO_URI: process.env.MONGO_URI,
        port: process.env.PORT,
    },
    development: {
        secret: 'I_AM_Mohammad',
        MONGO_URI: 'mongodb://localhost:27017/music_api',
        port: 3000,
    },
};

exports.getConfig = env => config[env] || config.development;