import React, {Component} from 'react';
import ToDoNotes from './ToDoNotes/ToDoNotes';
import LocalStorageService from '../../../common/service/localStorageService';
import {notification, Icon, Modal} from 'antd';

export default class ToDoNotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoNotes: [],
            page: 0,
            visible: false,
            currSubject: ''
        }
    }

    
    componentDidMount() {
        this.getNotes();
    }

    getNotes = () => {
        this.setState({
            toDoNotes: LocalStorageService.findNotes()
        })
    };

    showNextPage = () => {
        this.setState({
            page: this.state.page + 1
        })
    };

    // openNotification = () => {
    //     notification.open({
    //         message: 'Notification Title',
    //         description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    //         icon: <Icon type="smile" style={{color: '#108ee9'}}/>
    //     });
    // };

    showPreviousPage = () => {
        this.setState({
            page: this.state.page - 1
        });

        // if(this.state.page) this.openNotification();
    };

    confirmDeleteNote = (noteId, isActive) => {
        if (isActive) {
            Modal.confirm({
                title: 'Do you want to delete these To Do\'s?',
                content: 'This note will not come back, make sure you do the right thing :)',
                onOk: () => {
                    this.deleteNote(noteId);
                },
                onCancel: () => {
                },
            });
        } else {
            this.deleteNote(noteId);
        }
    };

    deleteNote = (noteId) => {
        LocalStorageService.deleteNote(noteId);
        this.getNotes();
    };

    toggleModal = (currSubject) => {
        console.log('metoda curr subject');
        this.setState({
            visible: !this.state.visible,
            currSubject: currSubject
        });
    };

    handleOk = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {toDoNotes, page} = this.state;

        const itemsToDisplay = 6;
        const startIndex = page * itemsToDisplay;
        const visibleToDoNotes = toDoNotes ? toDoNotes.slice(startIndex, startIndex + itemsToDisplay) : null;

        return (
            <React.Fragment>
                <h1>{page}</h1>
                <div className="note-list-container">
                    <span>
                        <button className={"btn-transparent"}
                                onClick={this.showPreviousPage} disabled={!page}>
                            <span className={"icon-left-arrow"}
                                  style={{fontSize: "4rem", cursor: "pointer"}}></span>
                        </button>
                    </span>
                    <div className="note-list-wrapper">
                        {visibleToDoNotes ? visibleToDoNotes.map((toDoNote, index) =>
                            <ToDoNotes toDoNote={toDoNote}
                                       visible={this.state.visible}
                                       handleOk={this.handleOk}
                                       toggleModal={() => this.toggleModal(toDoNote.subject)}
                                       currSubject={this.state.currSubject}
                                       confirmDeleteNote={this.confirmDeleteNote}
                                       key={index}/>) : null}
                    </div>
                    <span>
                        <button className={"btn-transparent"}
                                onClick={this.showNextPage}>
                            <span className={"icon-right-arrow"}
                                  style={{fontSize: "4rem", cursor: "pointer"}}></span>
                        </button>
                    </span>
                </div>
            </React.Fragment>
        )
    }
}