const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('public'));

require('custom-env').env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const posts = require('./routes/Post');
const users = require('./routes/User');
const tokens = require('./routes/Token');


app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/tokens', tokens);

app.listen(process.env.PORT);