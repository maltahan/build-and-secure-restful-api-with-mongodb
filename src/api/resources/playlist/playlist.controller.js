const playlistService = require('./playlist.service');
const Playlist = require('./playlist.model');

exports.create = async function(req, res) {
        try {
            const { value, error } = playlistService.validateBody(req.body);
            if (error && error.details) {
                return res.json(error);
            }
            const playlist = await Playlist.create(Object.assign({}, value, { user: req.user._id }));
            return res.json(playlist);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
};

exports.findAll = async function (req, res) {
    try {
        const playlists = await Playlist.find()
            .populate('songs')
            .populate('user', 'firstName lastName');
        return res.json(playlists);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};