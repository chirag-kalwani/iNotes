import notesContext from "./NotesContext";
import {useState} from "react";

const NotesState = (props) => {
    // States
    const [notes, setNotes] = useState([{}]);
    // Local Host
    let host = "http://127.0.0.1:5000"
    // Show notes to show all notes
    const showNotes = async () => {
        let response = await fetch(host + "/api/notes/fetchallnotes",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNzdjNDk2YWY2NGUzODUzOGM5MDRhIn0sImlhdCI6MTY1OTMzNzgwMX0.AvsGclNZd5Pb0nNQNjmnptbkjo_EnXvjW5pRbg31imQ'
                }
            }
        );
        setNotes(await response.json());
    };
    //Add Notes
    const addNote = async (title, description, tag) => {
        let response = await fetch(host + "/api/notes/addnotes",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNzdjNDk2YWY2NGUzODUzOGM5MDRhIn0sImlhdCI6MTY1OTMzNzgwMX0.AvsGclNZd5Pb0nNQNjmnptbkjo_EnXvjW5pRbg31imQ'
                },
                body: JSON.stringify({'title': title, 'description': description, 'tag': tag})
            }
        );
        setNotes(notes.concat(await response.json()));
    };
    // Delete Notes
    const deleteNote = async (id) => {
        await fetch(host + `/api/notes/deletenote/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNzdjNDk2YWY2NGUzODUzOGM5MDRhIn0sImlhdCI6MTY1OTMzNzgwMX0.AvsGclNZd5Pb0nNQNjmnptbkjo_EnXvjW5pRbg31imQ'
                }
            }
        );
        await showNotes();
    };
    // Edit Notes
    const editNote = async (id, title, description, tag) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNzdjNDk2YWY2NGUzODUzOGM5MDRhIn0sImlhdCI6MTY1OTMzNzgwMX0.AvsGclNZd5Pb0nNQNjmnptbkjo_EnXvjW5pRbg31imQ"
        }
        let bodyContent = JSON.stringify({
            "title": title,
            "description": description,
            "tag": tag
        });
        await fetch(`http://127.0.0.1:5000/api/notes/updatenote/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
        await showNotes();
    };
    return (
        <notesContext.Provider
            value={{notes: notes, addNote: addNote, deleteNote: deleteNote, editNote: editNote, showNotes: showNotes}}>
            {props.children}
        </notesContext.Provider>
    )
};

export default NotesState;
