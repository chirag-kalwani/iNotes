import React, {useContext, useState} from 'react';
import notesContext from "../context/notes/NotesContext";

function AddNote() {
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "",
    });
    const context = useContext(notesContext);
    const {addNote, showAlert} = context;
    const submitForm = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag).then(showAlert("item added succesfully", "success")).catch((e) => showAlert(e, "warning"));
        setNote({title: "", description: "", tag: ""});
    };
    const onchange = (e) => {
        if (e.target.id === 'title') {
            setNote({
                description: note.description,
                title: e.target.value,
                tag: note.tag
            });
        } else if (e.target.id === 'description') {
            setNote({
                description: e.target.value,
                title: note.title,
                tag: note.tag
            });
        } else { // e.target.id === 'tag'
            setNote({
                description: note.description,
                title: note.title,
                tag: e.target.value
            });
        }
    };
    return (
        <>
            <h1>Add a Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" placeholder="Enter The Title of Your Note" value={note.title} onChange={onchange}
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
                    <input placeholder="Enter The Tag of Your Note" value={note.tag} onChange={onchange} type="text"
                           name="tag" className="form-control"
                           id="tag"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={submitForm}>Add Note</button>
            </form>
        </>
    );
}

export default AddNote;