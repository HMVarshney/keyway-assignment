const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

const { verifyJWT } = require('./middlewares/authentication');
const { jwtSecret, jwtLife } = require('./constants');

mongoose.connect('mongodb+srv://admin:admin@cluster0.gbe1u.gcp.mongodb.net/keyway?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('connected to database');
    })
    .catch((error) => {
        console.log(error);
        process.exit();
    });

app.use(cors());
app.use(express.json());
app.use('/posts', verifyJWT);


const constants = require('./constants');

const authRoutes = require('./routes/authentication');
const postsRoutes = require('./routes/posts');

app.get('/', (req, res) => {
    res.send('Server Running!')
});

app.get('/verifyJWT', (req, res) => {
    if (req.headers.authorization) {
        let accessToken = req.headers.authorization.split(' ')[1]
        let payload;

        try {
            payload = jwt.verify(accessToken, jwtSecret, {
                maxAge: jwtLife
            });
            res.send();
            return;

        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.use('/auth/local', authRoutes);
app.use('/posts', postsRoutes);

app.listen(constants.PORT, () => {
    console.log(`server running on ${constants.PORT}`);
});