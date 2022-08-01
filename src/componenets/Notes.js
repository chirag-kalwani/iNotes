import React, {useContext, useEffect} from 'react';
import notesContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes() {
    const context = useContext(notesContext);
    const {notes, showNotes} = context;
    useEffect(() => {
        showNotes();
    }, []);
    return (
        <>
            {/*Add Note is a form to add a note*/}
            <AddNote/>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <h1 className="my-3">Your Notes</h1>
            <div className="row">
                {
                    notes.map((note, index) => {
                        // NoteItem is pattern of one note
                        return <NoteItem key={index} note={note}/>;
                    })
                }
            </div>
        </>
    );
}

export default Notes;