const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true } );
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