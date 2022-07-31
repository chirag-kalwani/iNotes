import notesContext from "./NotesContext";

const NotesState = (props) => {
    return (
        <notesContext.Provider value={""}>
            {props.children}
        </notesContext.Provider>
    )
};

export default NotesState;
