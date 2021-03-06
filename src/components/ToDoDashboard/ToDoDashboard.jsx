import React, {Component} from 'react';
import ToDoNotesList from './ToDoNotesList/ToDoNotesList';
import ToDoHeader from './ToDoHeader/ToDoHeader';
import ToDoButton from '../../common/components/ToDoButton/ToDoButton';
import LocalStorageService from '../../common/service/localStorage.service';
import NotificationService, {
    notificationOptions,
    confirmationModalOptions
} from '../../common/service/notification.service';

export default class ToDoDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoNotes: [],
            page: 0,
            itemsPerPage: 6
        }
    }

    componentDidMount() {
        this.getNotes(this.state.itemsPerPage, this.state.page);
    }

    //force is optional argument, if you pass it then it will load all results from local storage object
    getNotes = (itemsPerPage, page) => {
        this.setState({
            toDoNotes: LocalStorageService.findAndPaginateNotes(itemsPerPage, page)
        })
    };

    showNextPage = () => {
        const {itemsPerPage, page} = this.state;
        this.setState({
            page: page + 1,
        }, () => {
            let pageNumber = page + 1;
            this.getNotes(itemsPerPage, pageNumber);
        });
    };

    showPreviousPage = () => {
        const {itemsPerPage, page} = this.state;
        this.setState({
            page: page - 1,
        }, () => {
            let pageNumber = page - 1;
            this.getNotes(itemsPerPage, pageNumber);
        });
    };

    completedOrInProgressNote = (noteId, isActive) => {
        const completed = notificationOptions[0];
        const inProgress = notificationOptions[1];

        if (isActive) {
            LocalStorageService.updateNoteStatus(noteId, 'isActive', false);
            NotificationService.openNotification(
                completed.message,
                completed.description,
                completed.iconType
            );
        } else {
            LocalStorageService.updateNoteStatus(noteId, 'isActive', true);
            NotificationService.openNotification(
                inProgress.message,
                inProgress.description,
                inProgress.iconType
            );
        }
        this.getNotes(this.state.itemsPerPage, this.state.page);
    };

    confirmDeleteNote = (noteId, isActive) => {
        isActive ? NotificationService.openConfirmationModal(
            noteId,
            this.deleteNote,
            confirmationModalOptions[0].title,
            confirmationModalOptions[0].content
            )
            : this.deleteNote(noteId);
    };

    deleteNote = (noteId) => {
        LocalStorageService.deleteNote(noteId);
        this.getNotes(this.state.itemsPerPage, this.state.page);
    };

    stateSetter = currentState => {
        this.setState({toDoNotes: currentState})
    };

    render() {
        const {toDoNotes, itemsPerPage, page} = this.state;

        return (
            <React.Fragment>
                <ToDoHeader
                    itemsPerPage={itemsPerPage}
                    page={page}
                    stateSetter={this.stateSetter}
                />
                <ToDoNotesList
                    toDoNotes={toDoNotes}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    getNotes={this.getNotes}
                    showPreviousPage={this.showPreviousPage}
                    showNextPage={this.showNextPage}
                    confirmDeleteNote={this.confirmDeleteNote}
                    completedOrInProgressNote={this.completedOrInProgressNote}/>
                <div className="btn-wrapper">
                    <ToDoButton btnClass="add-note-btn" routeTo="/todoform"/>
                </div>
            </React.Fragment>
        )
    }
}