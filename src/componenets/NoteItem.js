import React from 'react';

function NoteItem(props) {
    const {note} = props;
    return (
        <div className="col-md-4 my-3">
            <div className="card" style={{maxWidth: "28rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
}

export default NoteItem;