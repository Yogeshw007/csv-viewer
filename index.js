var express = require('express');
var expressLayouts = require('express-ejs-layouts');
const path = require('path');

var multer = require('multer');
var bodyParser = require('body-parser');

//connect to db
const db = require('./config/mongoose');

//init app
var app = express();

app.use(express.static(path.join(__dirname, 'assets')));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 8000;
app.listen(port, () => console.log('Server is up and running on PORT : ' + port));