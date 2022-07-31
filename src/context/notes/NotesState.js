import notesContext from "./NotesContext";
import {useState} from "react";

const NotesState = (props) => {
    const notesInitial = [
        {
            "_id": "62e69020e7d4a8a4e4f4abcc",
            "user": "62e68fdee7d4a8a4e4f4abc8",
            "title": "great chirag ki kahani",
            "description": "Cards assume no specific width to start, so they’ll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.",
            "tag": "gretest of all time",
            "date": "2022-07-31T14:22:24.123Z",
            "__v": 0
        },
        {
            "_id": "62e69020e7d4a8a4e4f4abcc",
            "user": "62e68fdee7d4a8a4e4f4abc8",
            "title": "great chirag ki kahani",
            "description": "Cards assume no specific width to start, so they’ll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.",
            "tag": "gretest of all time",
            "date": "2022-07-31T14:22:24.123Z",
            "__v": 0
        },
        {
            "_id": "62e69020e7d4a8a4e4f4abcc",
            "user": "62e68fdee7d4a8a4e4f4abc8",
            "title": "great chirag ki kahani",
            "description": "Cards assume no specific width to start, so they’ll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.",
            "tag": "gretest of all time",
            "date": "2022-07-31T14:22:24.123Z",
            "__v": 0
        },
        {
            "_id": "62e69020e7d4a8a4e4f4abcc",
            "user": "62e68fdee7d4a8a4e4f4abc8",
            "title": "great chirag ki kahani",
            "description": "Cards assume no specific width to start, so they’ll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.",
            "tag": "gretest of all time",
            "date": "2022-07-31T14:22:24.123Z",
            "__v": 0
        },
        {
            "_id": "62e69020e7d4a8a4e4f4abcc",
            "user": "62e68fdee7d4a8a4e4f4abc8",
            "title": "great chirag ki kahani",
            "description": "Cards assume no specific width to start, so they’ll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.",
            "tag": "gretest of all time",
            "date": "2022-07-31T14:22:24.123Z",
            "__v": 0
        },
        {
            "_id": "62e69040e7d4a8a4e4f4abcf",
            "user": "62e68fdee7d4a8a4e4f4abc8",
            "title": "great chirag ki kahani2",
            "description": "Cards assume no specific width to start, so they’ll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.2",
            "tag": "gretest of all time2",
            "date": "2022-07-31T14:22:56.053Z",
            "__v": 0
        }
    ];
    const [notes, setNotes] = useState(notesInitial);
    return (
        <notesContext.Provider value={{notes: notes, setNotes: setNotes}}>
            {props.children}
        </notesContext.Provider>
    )
};

export default NotesState;
