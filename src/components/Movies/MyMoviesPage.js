import React, {Component} from 'react';
import {loadMovies} from '../../models/movie';
import {Link} from 'react-router';
//import observer from '../../models/observer';
//import Reactable from 'reactable';
import Reactable from '../common/reactable';


let Table = Reactable.Table;
let Thead = Reactable.Thead;
let Th = Reactable.Th;

export default class MyMoviesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mymovies: [],
            hasMovies: false
        };
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        // Display My movies
        response.map((e, i) => {
            if(sessionStorage.getItem('userId')== e._acl.creator){
                this.state.mymovies.push(e);
                this.setState({hasMovies: true})
            }});
    }

    componentDidMount() {
        // Request list of movies from the server
        loadMovies(this.onLoadSuccess);
    }

    addActions(){
        let moviesForTable = [];
        this.state.mymovies.map((e, i) => {
            let movieObj = {
                id:e._id,
                title:e.title,
                summary:e.summary,
                director:e.director,
                genre:e.genre,
                rating:Number(e.rating),
                date:e.date,
                actions:<Link to={"/movies/" + e._id} className="btn btn-group-sm">Details</Link>};
            moviesForTable.push(movieObj);
        });
        return moviesForTable;
    }

    render() {
        let message = <h3>You haven't created any movies yet. Click <Link to="/create">here</Link> to create your first movie.</h3>;
        let data = this.addActions();

        if(this.state.hasMovies){
            return (
                <div>
                    <h1>My Movies Page</h1>
                    <Link to="/create" className="btn btn-info">Create movie</Link>
                    <Table className="table"
                           filterable={['title', 'summary', 'director', 'genre', 'rating','date']}
                           noDataText="No matching records found"
                           itemsPerPage={5}
                           currentPage={0}
                           sortable={true}
                           data={data}>
                        <Thead>
                        <Th column="title">
                            <em className="title-header">Title</em>
                        </Th>
                        <Th column="summary">
                            <em className="summary-header">Summary</em>
                        </Th>
                        <Th column="director">
                            <em className="director-header">Director</em>
                        </Th>
                        <Th column="genre">
                            <em className="genre-header">Genre</em>
                        </Th>
                        <Th column="rating">
                            <em className="rating-header">Rating</em>
                        </Th>
                        <Th column="date">
                            <em className="date-header">Release date</em>
                        </Th>
                        <Th column="actions">
                            <em className="actions-header">Details</em>
                        </Th>
                        </Thead>
                    </Table>
                </div>
            );
        } else
            return <div>{message}</div>
    }
}