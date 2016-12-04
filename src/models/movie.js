// eslint-disable-next-line
import {get, post, update} from './requester';
import {joinTeam} from './user';

function loadMovies(callback) {
    // Request teams from db
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

function edit(movieId, title, summary,director,genre,rating,date, callback) {
    let movieData = {
        title: title,
        summary: summary,
        director: director,
        genre: genre,
        rating: rating,
        date: date,
    };
    update('appdata', 'movies/' + movieId,movieData, 'kinvey')
        .then(callback(true));
}

function create(title, summary,director,genre,rating,date, callback) {
    let movieData = {
        title: title,
        summary: summary,
        director: director,
        genre: genre,
        rating: rating,
        date: date,
    };
    post('appdata', 'movies', movieData, 'kinvey')
        .then((response) => {
            joinTeam(response._id, callback);
        });
}

export {loadMovies, loadMovieDetails, loadUsersDetails, edit, create};