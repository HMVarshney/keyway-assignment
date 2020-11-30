const jwt = require('jsonwebtoken');
const { jwtSecret, jwtLife } = require('../constants');
const bcrypt = require('bcrypt');

const UserModal = require('../models/authentication');

async function register(req, res) {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const hashedPassword = await generateHash(password);

    const user = new UserModal({
        username,
        password: hashedPassword,
        email
    });

    user.save().then((result) => {
        const token = jwt.sign({ username, password }, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: jwtLife
        });

        // res.cookie('auth-jwt', token, { httpOnly: true });
        result.password = undefined;

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

    UserModal.findOne({ email }, async (error, result) => {
        if (error) {
            res.sendStatus(500);
            return;
        } else if (result) {

            if (!await decryptPassword(password, result.password)) {
                return res.status(401).json({ message: 'Email or Password is wrong' });
            }

            const token = jwt.sign({ email, password }, jwtSecret, {
                algorithm: 'HS256',
                expiresIn: jwtLife
            });

            // res.cookie('auth-jwt', token, { httpOnly: true });
            result.password = undefined;

            res.status(200).json({ jwt: token, user: result });
            return;

        } else {
            res.status(404).json([]);
        }

    });
};

async function generateHash(password) {
    return await bcrypt.hash(password, 10);
}

async function decryptPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    register: register,
    login: login
};