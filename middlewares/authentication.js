const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../constants');

function verifyJWT(req, res, next) {

    if (req.headers.authorization) {
        let accessToken = req.headers.authorization.split(' ')[1]
        console.log(accessToken);

        let payload;

        try {
            payload = jwt.verify(accessToken, jwtSecret);
            next();

        } catch (error) {
            res.status(401).send();
            return;
        }
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = {
    verifyJWT: verifyJWT
}