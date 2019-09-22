const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');
const bodyParser = require('body-parser');

// sequelize models
const models = require('./models');

// constants
const port = process.env.PORT || 5001;

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// utils
const verifyToken = require('./utils/verifyToken');

// routes handlers
const verifyUser = require('./routes/login');
const registerUser = require('./routes/register');
const comment = require('./routes/comment');


app.use(express.static('dist/commento-hollic-frontend' || ''));

//routes
app.post('/login', verifyUser);
app.post('/register', registerUser);
app.use('/comment', verifyToken, comment);

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/commento-hollic-frontend/index.html');
});

// Error Handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message

    });
});

// connect db
models.sequelize.sync().then(function () {
    app.listen(port, () => console.log("server started at port " + port));
});
