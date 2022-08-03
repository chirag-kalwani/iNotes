import React, {useContext} from 'react';
import notesContext from "../context/notes/NotesContext";


function Alert() {
    const context = useContext(notesContext);
    const {alert} = context;
    return (
        <div className="position-sticky" style={{height: "50px", top: "0", zIndex: "5"}}>
            {alert.show &&
                <div className={`alert alert-${alert.type}`} id="alert" role="alert">
                    <div>{alert.msg}</div>
                </div>}
        </div>
    );
}

export default Alert;