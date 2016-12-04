import React, {Component} from 'react';
import Reactable from 'reactable';

let Table = Reactable.Table;
let Thead = Reactable.Thead;
let Th = Reactable.Th;

export default class TableTemplate extends Component {
    renderTable() {
        return (
            <Table className="table"
                   filterable={this.props.filterable}
                   noDataText="No matching records found"
                   itemsPerPage={this.props.itemsPerPage}
                   currentPage={this.props.currentPage}
                   sortable={true}
                   data={this.props.data}>
                <Thead>
                <Th column="title">Title</Th>
                <Th column="summary">Summary</Th>
                <Th column="director">Director</Th>
                <Th column="genre">Genre</Th>
                <Th column="rating">Rating</Th>
                <Th column="date">Date</Th>
                </Thead>
            </Table>
        )
    }
    render() {
        return (
            <div>
                <div>{this.renderTable()}</div>
            </div>
        );
    }
}