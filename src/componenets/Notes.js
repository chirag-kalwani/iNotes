import React, {useContext} from 'react';
import notesContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";

function Notes() {
    const context = useContext(notesContext);
    const {notes, setNotes} = context;
    return (
        <div className="row">
            {
                notes.map((note) => {
                    return <NoteItem note={note}/>;
                })
            }
        </div>
    );
}

export default Notes;