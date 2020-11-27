const express = require('express');
const app = express();
// const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { verifyJWT } = require('./middlewares/authentication');

mongoose.connect('mongodb+srv://admin:admin@cluster0.gbe1u.gcp.mongodb.net/keyway?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('connected to database');
    })
    .catch((error) => {
        console.log(error);
        process.exit();
    });

// app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

//     next();
// });
app.use('/posts', verifyJWT);


const constants = require('./constants');

const authRoutes = require('./routes/authentication');
const postsRoutes = require('./routes/posts');

app.get('/', (req, res) => {
    res.send('Server Running!')
});

app.use('/auth/local', authRoutes);
app.use('/posts', postsRoutes);

app.listen(constants.PORT, () => {
    console.log(`server running on ${constants.PORT}`);
});