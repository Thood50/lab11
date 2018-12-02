'use strict'

/////////////////// SETUP //////////////////////////
const express = require('express');
const superagent = require('superagent');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

//////////////////// ROUTES //////////////////////////

app.get('/', getHome);

app.post('/searches', createSearch);

app.listen(PORT, () => console.log(`Listening on ${POST}`));

//////////////////// MODELS //////////////////////////

function Book(info) {
    const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

    this.title = info.volumeInfo.title || 'No title available';
    this.isbn = info.volumeInfo.industryIdentifiers[0].identifier || info.volumeInfo.industryIdentifiers[1].identifier || 'No ISBN available';
    this.image_url = info.volumeInfo.imageLinks.smallThumbnail|| placeholderImage;
    this.author = info.volumeInfo.authors || 'No author available';
    this.description = info.volumeInfo.description || 'No description available';
}

//////////////////// HANDLERS /////////////////////////

function getHome (request, response) {
    return response.render('pages/index.ejs');
}

function createSearch(request, response) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  
    if (request.body.searchRadio === 'title') { url += `+intitle:${request.body.searchTerm}&maxResults=20`; }
    if (request.body.searchRadio === 'author') { url += `+inauthor:${request.body.searchTerm}&maxResults=20`; }
  
    superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult)))
    .then(results => response.render('pages/searches/show', {searchResults: results}))
    .catch(error => handleError(error, response));
}

function handleError(error, response) {
    console.log(error);
    response.render('pages/error.ejs', {error: 'Uh Oh'});
}
