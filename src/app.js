var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./api.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/fotosp', express.static('public/images/posts'));
app.use('/fotos', express.static('public/images/profPics'));
app.use('/style', express.static('public/stylesheet'));
app.use('/api', api);

app.listen(3003);
