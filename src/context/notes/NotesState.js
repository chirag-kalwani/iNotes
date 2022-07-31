import {useState} from "react";
import notesContext from "./NotesContext";

const NotesState = (props) => {

    const [state, setState] = useState({
        "name": "Chirag",
        "class": "5b"
    });
    const update = () => {
        console.log("Updated");
        setTimeout(() => {
            setState({
                name: "Chirag Kalwani",
                class: "8b",
            })
        }, 1000);
    };
    return (
        <notesContext.Provider value={{state: state, update: update}}>
            {props.children}
        </notesContext.Provider>
    )
};

export default NotesState;
