import React, {useContext, useEffect, useRef, useState} from 'react';
import notesContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from "react-router-dom";

function Notes() {
    let history = useNavigate();
    const context = useContext(notesContext);
    const {notes, showNotes, editNote, showAlert} = context;
    useEffect(() => {
        if (localStorage.getItem('authToken'))
            showNotes().then().catch((e) => {
                showAlert(e, "warning");
            });
        else {
            showAlert("Please sign up or log in first", "warning");
            history('/signup');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const ref = useRef(null);
    const closeRef = useRef(null);
    const updateNote = (not) => {
        ref.current.click();
        setNote(not);
    };
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "",
        _id: ""
    });
    const saveChanges = () => {
        closeRef.current.click();
        editNote(note._id, note.title, note.description, note.tag).then(showAlert("Edit note succesfully", 'success')).cache(e => showAlert(e, 'warning'));
    };
    const onchange = (e) => {
        if (e.target.id === 'title') {
            setNote({
                description: note.description,
                title: e.target.value,
                tag: note.tag,
                _id: note._id
            });
        } else if (e.target.id === 'description') {
            setNote({
                description: e.target.value,
                title: note.title,
                tag: note.tag,
                _id: note._id
            });
        } else { // e.target.id === 'tag'
            setNote({
                description: note.description,
                title: note.title,
                tag: e.target.value,
                _id: note._id
            });
        }
    };
    return (
        <>
            {/*Add Note is a form to add a note*/}
            <AddNote/>
            {/*Following is the form to update the note*/}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                Edit Note
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" placeholder="Enter The Title of Your Note" value={note.title}
                                           onChange={onchange}
                                           className="form-control" id="title"
                                           name="title" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <textarea placeholder="Enter The Description of Your Note" value={note.description}
                                              onChange={onchange}
                                              className="form-control" id="description" name="description"
                                              rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input placeholder="Enter The Tag of Your Note" value={note.tag} onChange={onchange}
                                           type="text"
                                           name="tag" className="form-control"
                                           id="tag"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeRef} className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button type="button" onClick={saveChanges} className="btn btn-primary">Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Following is the display of the notes*/}
            <h1 className="my-3">Your Notes</h1>
            <div className="row">
                {
                    Array.from(notes).map(function (note, index) {
                        // NoteItem is pattern of one note
                        return <NoteItem key={index} updateNote={updateNote} note={note}/>;
                    })
                }
            </div>
        </>
    );
}

export default Notes;