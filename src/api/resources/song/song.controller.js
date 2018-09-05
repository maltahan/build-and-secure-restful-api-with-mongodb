const Joi = require("joi");
const songModel = require("./song.model"); 

exports.create = async function (req, res) {
    try {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            url: Joi.string().required(),
            rating: Joi.number().integer().min(0).max(5).optional(),

        });
        const { value, error } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(400).json(error);
        }
        const song = await songModel.create(Object.assign({}, value, { artist: req.user._id }));
        return res.json(value);
    }
    catch(err) {
        return res.status(500).send(err);
}
};
exports.getAll =async function(req, res) {
    try {
        const { page, perPage } = req.query;
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: {
                path: 'artist',
                select: 'firstName lastName',
            },
        };
        const songs = await songModel.paginate({}, options);
        return res.json(songs);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
},



exports.getOne = async function (req, res) {
    try {
        const songiId = req.params.id;
        //we are using the populte method from mongoose to join two tables it is powerful than $lookup 
        const song = await songModel.findById(songiId).populate('artist', 'firstName lastName');
        if (!song) {
            return res.status(404).json({err:'could not find song'}) ;
        }
        return res.json(song);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

exports.deleteById = async function (req, res) {
    try {
        const songiId = req.params.id;
        const song = await songModel.findOneAndRemove(songiId);
        if (!song) {
            return res.status(404).json({ err: 'could not find song' });
        }
        return res.json(song);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

exports.update = async function (req, res) {
    try {
        const { id } = req.params;
        const schema = Joi.object().keys({
            title: Joi.string().optional(),
            url: Joi.string().optional(),
            rating: Joi.number()
                .integer()
                .min(0)
                .max(5)
                .optional(),
        });
        const { value, error } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(400).json(error);
        }
        const song = await songModel.findOneAndUpdate({ _id: id }, value, { new: true });
        if (!song) {
            return res.status(404).json({ err: 'could not find song' });
        }
        return res.json(song);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};



