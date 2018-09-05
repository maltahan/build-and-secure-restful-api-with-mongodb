const express = require('express');
const passport = require('passport');
const playlistController = require('./playlist.controller');

const playListRouter = express.Router();
playListRouter.route('/').post(passport.authenticate('jwt', { session: false }), playlistController.create)
    .get(passport.authenticate('jwt', { session: false }), playlistController.findAll);

module.exports = playListRouter;