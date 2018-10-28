import React from 'react';
import ToDoEditModal from '../../../../common/components/ToDoEditModal/ToDoEditModal';

const ToDoNotes = props => {
    const {deadline, subject, priority, noteId, isActive} = props.toDoNote;
    return (
        <React.Fragment>
            <ToDoEditModal
                visible={props.visible}
                handleOk={props.handleOk}
                toggleModal={props.toggleModal}
                currToDoNote={props.currToDoNote}>
            </ToDoEditModal>
            <div className="note-container" style={{boxShadow: !isActive ? `0 0 0 1px ${priority}` : null}}>
                <div className="note-body">
                    <span className="note-btn-wrapper">
                        <button className="btn-transparent" onClick={() => props.confirmDeleteNote(noteId, isActive)}>
                            <span className="icon-trash"></span>
                        </button>
                    </span>
                    <h3>{deadline}</h3>
                    <h3>{subject}</h3>
                    <span className="note-btn-details-wrapper">
                        <button className="btn-transparent note-btn-icon"
                                onClick={props.toggleModal}
                                style={{background: priority}}>
                            <span className="icon-edit"></span>
                        </button>
                        <button className="btn-transparent note-btn-icon"
                                style={{background: priority}}>
                            <span className="icon-check"></span>
                        </button>
                    </span>
                </div>
            </div>
        </React.Fragment>
    )
};

export default ToDoNotes;