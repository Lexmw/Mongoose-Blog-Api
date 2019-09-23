const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();


mongoose.connect(`mongodb://admin:tester123@ds229648.mlab.com:29648/heroku_53wqxxpm`, { useNewUrlParser: true } );
mongoose.Promise = Promise;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/', (req,res) => {
    res.status(200).send('Hello World');
})

app.use('/api/users', require('./routes/users'));

app.use('/api/blogs', require('./routes/blogs'));



module.exports = app;