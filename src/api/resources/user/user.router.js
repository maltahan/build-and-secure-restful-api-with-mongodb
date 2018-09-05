const express = require('express');
const userController = require('./user.controller');
const Passport = require('passport');

const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/me', Passport.authenticate("jwt", {session:false}), userController.authenticate);
module.exports = userRouter;


