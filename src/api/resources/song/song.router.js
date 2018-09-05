const express = require('express');
const songController = require('./song.controller');
const Passport = require('passport');
const isArtist = require('../../middlewares/is-artist');


const songRouter = express.Router();
const artistPolicy = [Passport.authenticate('jwt', { session: false }), isArtist];

// 1.authenticated user can view all the songs
// 2.an artist can create, update, and delete song


songRouter.route('/').post(artistPolicy, songController.create)
.get(Passport.authenticate("jwt", { session: false }), songController.getAll);

songRouter.route('/:id').get(Passport.authenticate("jwt", { session: false }), songController.getOne)
    .delete(artistPolicy, songController.deleteById).put(artistPolicy, songController.update);
module.exports = songRouter;


