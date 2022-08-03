import React, {useContext} from 'react';
import notesContext from "../context/notes/NotesContext";

function NoteItem(props) {
    const {note, updateNote} = props;
    const context = useContext(notesContext);
    const {deleteNote, showAlert} = context;
    const deleteCurrentNote = () => {
        deleteNote(note._id).then(showAlert("Your note has been deleted succesfully", "success")).catch(e => showAlert(e, 'warning'));
    };
    const updateCurrentNote = () => {
        if (localStorage.getItem('authToken'))
            updateNote(note);
        else
            showAlert("Please Sign in to edit note", 'warning');
    };
    return (
        <div className="col-md-4 my-3">
            <div className="card" style={{maxWidth: "28rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
                <div style={{display: "inline-block", margin: "2px auto 10px"}}>
                    <i onClick={deleteCurrentNote}
                       className="mx-3 fa-solid fa-trash-can"
                       style={{cursor: "pointer", fontSize: "1.4rem"}}></i>
                    <i onClick={updateCurrentNote} className="mx-3 fa-solid fa-file-pen"
                       style={{cursor: "pointer", fontSize: "1.4rem"}}></i>
                </div>
            </div>
        </div>
    );
}

export default NoteItem;