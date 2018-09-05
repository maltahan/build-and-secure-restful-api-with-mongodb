const express = require('express');
const songRouter = require('./resources/song');
const userRouter = require('./resources/user');
const playListRouter = require('./resources/playlist');

const restRouter = express.Router();
restRouter.use('/songs', songRouter);
restRouter.use('/users', userRouter);
restRouter.use('/playlist', playListRouter);
module.exports = restRouter;
