import React from 'react';
import ToDoEditModal from '../../../../common/components/ToDoEditModal/ToDoEditModal';
import {Tooltip} from 'antd';
import {tooltipOptions} from '../../../../common/service/notification.service';

const ToDoNotes = props => {
    const {deadline, subject, priority, noteId, isActive} = props.toDoNote;

    return (
        <React.Fragment>
            <ToDoEditModal
                visible={props.visible}
                handleOkModal={props.handleOkModal}
                toggleModal={props.toggleModal}
                currNoteId={props.currNoteId}>
            </ToDoEditModal>
            <div className="note-container"
                 style={{boxShadow: !isActive ? `0 0 0 1px ${priority}` : null}}>
                <div className="note-body">
                    <span className="note-btn-wrapper">
                        <Tooltip placement={'top'}
                                 title={tooltipOptions.deleteNote}>
                            <button className="btn-transparent"
                                    onClick={() => props.confirmDeleteNote(noteId, isActive)}>
                                <span className="icon-trash"></span>
                            </button>
                        </Tooltip>
                    </span>
                    <h3>{deadline.substr(0, 10)}</h3>
                    <h3>{subject}</h3>
                    <span className="note-btn-details-wrapper">
                        <Tooltip placement="top"
                                 title={tooltipOptions.editNote}>
                            <button className="btn-transparent note-btn-icon"
                                    onClick={props.toggleModal}
                                    style={{background: priority}}>
                                <span className="icon-edit"></span>
                            </button>
                            </Tooltip>
                        <Tooltip placement="top"
                                 title={`${tooltipOptions.updateNoteStatus}${isActive ? 'in progress' : 'completed'}`}>
                            <button className="btn-transparent note-btn-icon"
                                    onClick={() => props.completedOrInProgressNote(noteId, isActive)}
                                    style={{background: priority}}>
                                <span className="icon-check"></span>
                            </button>
                         </Tooltip>
                    </span>
                </div>
            </div>
        </React.Fragment>
    )
};

export default ToDoNotes;