import React, {useContext} from 'react';
import notesContext from "../context/notes/NotesContext";

function NoteItem(props) {
    const {note} = props;
    const context = useContext(notesContext);
    const {deleteNote, editNote} = context;
    const editText = async () => {
        await editNote(note._id, note.title, note.description, note.tag);
    };
    return (
        <div className="col-md-4 my-3">
            <div className="card" style={{maxWidth: "28rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
                <div style={{display: "inline-block", margin: "2px auto 10px"}}>
                    <i onClick={() => deleteNote(note._id)} className="mx-3 fa-solid fa-trash-can"
                       style={{cursor: "pointer", fontSize: "1.4rem"}}></i>
                    <i onClick={editText} className="mx-3 fa-solid fa-file-pen"
                       style={{cursor: "pointer", fontSize: "1.4rem"}}></i>
                </div>
            </div>
        </div>
    );
}

export default NoteItem;