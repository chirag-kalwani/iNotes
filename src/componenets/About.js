import React, {useContext, useEffect} from 'react';
import NotesContext from "../context/notes/NotesContext";

function About() {
    const a = useContext(NotesContext);
    useEffect(()=>{
        a.update();
        // eslint-disable-next-line
    },[]);
    return (
        <div>
            This is Nothing but a about {a.state.name}
        </div>
    );
}

export default About;