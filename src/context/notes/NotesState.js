import notesContext from "./NotesContext";
import {useState} from "react";

const NotesState = (props) => {
    // States
    const [notes, setNotes] = useState([]);
    const [alert, setAlert] = useState({show: false, msg: "This is Alert", type: "success"});
    const showAlert = (msg, type) => {
        setAlert({
            show: true,
            msg: msg,
            type: type
        });
        setTimeout(() => {
            setAlert({
                show: false,
                msg: "This is Alert",
                type: "success"
            });
        }, 5000);
    };
    // Show notes to show all notes
    const showNotes = () => {
        return new Promise((resolve, reject) => {
            if (!localStorage.getItem('authToken')) {
                reject("Please Sign in to see your notes");
                return;
            }
            let headersList = {
                "auth-token": localStorage.getItem('authToken')
            }
            fetch("/api/notes/fetchallnotes", {
                method: "GET",
                headers: headersList
            }).then(data => data.json()).then((res) => {
                if (res.error) {
                    reject("Please Sign in to see your notes");
                    return;
                }
                setNotes(res);
                resolve();
            }).catch(() => reject("Server down please check after some time."));
        });
    };
    //Add Notes
    const addNote = (title, description, tag) => {
        return new Promise((resolve, reject) => {
            if (!localStorage.getItem('authToken')) {
                reject("Please Sign in to add the notes");
                return;
            }
            let headersList = {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authToken')
            }
            fetch("/api/notes/addnotes", {
                method: "POST",
                headers: headersList,
                body: JSON.stringify({'title': title, 'description': description, 'tag': tag})
            }).then(data => data.json()).then((res) => {
                if (res.errors) {
                    reject("Enter details correctly to add a note, description of length 5 to 100 and title should greater than 3");
                    return;
                }
                showNotes().then(resolve).catch((e) => reject(e));
            }).catch(() => reject("Server down | Fail to add note"));
        });
    };
    // Delete Notes
    const deleteNote = (id) => {
        return new Promise((resolve, reject) => {
            if (!localStorage.getItem('authToken')) {
                reject("Please Sign in to delete your notes");
                return;
            }
            let headersList = {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authToken')
            }
            fetch(`/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: headersList
            }).then(data => data.json()).then(() => {
                showNotes().then(resolve).catch((e) => reject(e));
            }).catch(() => reject("Server down | Fail to delete note"));
        });
    };
    // Edit Notes
    const editNote = (id, title, description, tag) => {

        return new Promise((resolve, reject) => {
            if (!localStorage.getItem('authToken')) {
                reject("Please Sign in to update your notes");
                return;
            }
            console.log(localStorage.getItem('authToken'));
            let headersList = {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authToken')
            }
            fetch(`/api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: headersList,
                body: JSON.stringify({'title': title, 'description': description, 'tag': tag})
            }).then(data => data.json()).then((res) => {
                if (res.errors) {
                    reject("Enter details correctly to add a note, description of length 5 to 100 and title should greater than 3");
                    return;
                }
                showNotes().then(resolve).catch((e) => reject(e));
            }).catch(() => reject("Server down | Fail to add note"));
        });
    };
    return (
        <notesContext.Provider
            value={{
                alert: alert,
                notes: notes,
                addNote: addNote,
                deleteNote: deleteNote,
                editNote: editNote,
                showNotes: showNotes,
                showAlert: showAlert
            }}>
            {props.children}
        </notesContext.Provider>
    )
};

export default NotesState;
