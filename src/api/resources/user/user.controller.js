const userService = require('./user.service');
const User = require('./user.model');
const jwt = require('../../helpers/jwt');
const { STANDARD_ROLE }  = require('../../middlewares/userRules');

exports.signup =async function(req, res) {
    try {
        console.log("here is the standard role " + STANDARD_ROLE);
            const { value, error } = userService.validateSignup(req.body);
            if (error) {
                return res.status(400).json(error);
            }
            const encryptedPass = userService.encryptPassword(value.password);
            const user = await User.create({
                email: value.email,
                firstName: value.firstName,
                lastName: value.lastName,
                password: encryptedPass,
                role: value.role || STANDARD_ROLE,
            });
            return res.json({ success: true });
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
};

exports.login = async function(req, res) {
    try {
        const { value, error } =  userService.validateLogin(req.body);
        if (error) {
            return res.status(400).json(error);
        }
        const user = await User.findOne({ email: value.email });
        if (!user) {
            return res.status(401).json({ err: 'unauthorized' });
        }
        const authenticted = userService.comparePassword(value.password, user.password);
        if (!authenticted) {
            return res.status(401).json({ err: 'unauthorized' });
        }
         // send jwt token
        const token = jwt.issue({ id: user._id }, '1d');
        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

exports.authenticate = function (req, res) {
    return res.json(req.user);
};