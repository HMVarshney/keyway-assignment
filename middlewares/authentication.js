const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../constants');

function verifyJWT(req, res, next) {

    if (req.headers.authorization) {
        let accessToken = req.headers.authorization.split(' ')[1];

        let payload;

        try {
            payload = jwt.verify(accessToken, jwtSecret);
            next();

        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    verifyJWT: verifyJWT
}