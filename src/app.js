const express = require('express');
const logger = require('morgan');
const connect = require('./config/db');
const restRouter = require('./api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json'); 
const Passport = require('passport');
const configJWTStrategy  = require('./api/middlewares/passport-jwt');

const app = express();
const PORT = process.env.PORT || 3000;

connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', restRouter);
app.use('/api', restRouter);
app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        explorer: true,
    })
);
//if we dont want to the use the logger in production 
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
}
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message,
        },
    });
});
app.use(Passport.initialize());
configJWTStrategy();

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});
