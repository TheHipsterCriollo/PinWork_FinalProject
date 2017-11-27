var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./routers/api.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/api', api);
app.listen(3003);
