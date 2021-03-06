import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import HomePage from './components/Home/HomePage';
import Movies from './components/Movies/MoviesPage';
import MyMovies from './components/Movies/MyMoviesPage';
import About from './components/About/AboutPage';
import Login from './components/Login/LoginPage';
import Register from './components/Register/RegisterPage';
import Logout from './components/Logout/LogoutPage';
import Details from './components/Movies/Details';
import Edit from './components/Edit/EditPage';
import Create from './components/Create/CreatePage';
import Delete from './components/Delete/DeletePage';
import EditComment from './components/EditComment/EditComment';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="movies">
                <IndexRoute component={Movies}/>
                <Route path=":movieId" component={Details}/>
            </Route>
            <Route path="mymovies">
                <IndexRoute component={MyMovies}/>
                <Route path=":movieId" component={Details}/>
            </Route>
            <Route path="about" component={About}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="logout" component={Logout}/>
            <Route path="edit/:movieId" component={Edit}/>
            <Route path="create" component={Create}/>
            <Route path="delete/:movieId" component={Delete}/>
            <Route path="editComment/:commentId" component={EditComment}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
