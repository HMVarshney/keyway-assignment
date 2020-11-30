const jwt = require('jsonwebtoken');
const { jwtSecret, jwtLife } = require('../constants');

const UserModal = require('../models/authentication');

function register(req, res) {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const user = new UserModal({
        username,
        password,
        email
    });

    user.save().then((result) => {
        const token = jwt.sign({ username, password }, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: jwtLife
        });

        // res.cookie('auth-jwt', token, { httpOnly: true });
        res.json({
            user: result,
            jwt: token
        });

        return;

    }).catch((error) => {
        res.status(500).json({ error });
        return;
    });
};

function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    UserModal.findOne({ email, password }, (error, result) => {
        if (error) {
            res.sendStatus(500);
            return;
        } else if (result.length !== 0) {

            const token = jwt.sign({ email, password }, jwtSecret, {
                algorithm: 'HS256',
                expiresIn: jwtLife
            });

            // res.cookie('auth-jwt', token, { httpOnly: true });

            res.status(200).json({ jwt: token, user: result });
            return;

        } else {
            res.status(404).json([]);
        }

    });
};

// function logout(req, res) {
//     res.clearCookie('auth-jwt');
//     res.json({ message: 'OK' });
// }

module.exports = {
    register: register,
    login: login
};