const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const filmeRoutes = require('./routes/filme');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use('/filme', filmeRoutes);

module.exports = app;
