// eslint-disable-next-line
import {get, post, update, del} from './requester';


function loadMovies(callback) {
    // Request movies from db
    get('appdata', 'movies', 'kinvey')
        .then(callback);
}

function loadMovieDetails(movieId, onMovieSuccess) {
    get('appdata', 'movies/' + movieId, 'kinvey')
        .then(onMovieSuccess);
}

function loadUsersDetails(movieId, onUsersSuccess) {
    get('user', `?query={"movieId": "${movieId}"}`, 'kinvey')
        .then(onUsersSuccess);
}

function edit(movieId, title, summary, director, genre, rating, date, image, callback) {
    let movieData = {
        title: title,
        summary: summary,
        director: director,
        genre:genre,
        rating: rating,
        date:date,
        image:image
    };
    update('appdata', 'movies/' + movieId, movieData, 'kinvey')
        .then(callback(true));
}

function create(title, summary, director, genre, rating, date, image, callback) {
    let movieData = {
        title: title,
        summary: summary,
        director: director,
        genre:genre,
        rating: rating,
        date:date,
        image:image
    };
    post('appdata', 'movies', movieData, 'kinvey')
        .then(callback(true));
}

function deleteMovie(movieId, callback){
    del('appdata', 'movies/' + movieId, 'kinvey')
        .then(callback(true))
}

export {loadMovies, loadMovieDetails, loadUsersDetails, edit, create, deleteMovie};