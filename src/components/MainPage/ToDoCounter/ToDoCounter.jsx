import React, {Component} from 'react';
import LocalStorageService from '../../../common/service/localStorage.service';
import {Link} from 'react-router-dom';

export default class ToDoCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
        this.setState({notes: LocalStorageService.findAndPaginateNotes(undefined, undefined, true)});
    }

    render() {
        const {notes} = this.state;
        return (
            <div className="bounceInDown animated">
                {notes ?
                    notes.length !== 0 ?
                        <React.Fragment>
                        <span>Seems that you have todo's, it's
                            <span
                                className="text-brand number-length">{notes.length}</span> {notes.length === 1 ? 'note' : 'notes'}
                        </span>
                            <p><Link to="/tododashboard" className="text-brand">Go to dashboard</Link></p>
                        </React.Fragment>
                        : 'Seems that you have no to-doo things!' : 'Seems that you have no to-doo things!'}
            </div>
        );
    }
}