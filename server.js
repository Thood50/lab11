'use strict'

//general setup/package required
const express = require('express');
const superagent = require('superagent');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
