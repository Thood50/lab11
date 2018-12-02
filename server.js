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


//route to home page
app.get('/', getHome);

//////////////////// HANDLERS /////////////////////////

function getHome (request, response) {
    return response.render('pages/index.ejs');
}