const { ARTIST_ROLE } = require('../middlewares/userRules');

//this function accept as third argument a function, indicates do the next action
const isArtist = (req, res, next) => {
    //console.log(req.user.role + "  " + req.user.firstName + " " + typeof ARTIST_ROLE);
    // to be fixed why ARTIST_ROLE is undefined
    if (req.user.role !== ARTIST_ROLE) {
        return res.json({ err: 'unauthorized, not an artists' });
    }
    next();
};
module.exports = isArtist;