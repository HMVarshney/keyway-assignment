const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.jwt_secret || 'swsh23hjddnns';
const JWT_LIFE = process.env.jwt_life || 86400;

module.exports = {
    PORT,
    jwtSecret: JWT_SECRET,
    jwtLife: JWT_LIFE
};