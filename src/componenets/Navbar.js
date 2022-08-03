import React, {useContext} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import notesContext from "../context/notes/NotesContext";

function Navbar() {
    let location = useLocation();
    let history = useNavigate();
    const context = useContext(notesContext);
    const {showAlert} = context;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                                  aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                                  aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                    {
                        !localStorage.getItem('authToken') &&
                        <div>
                            <Link to="/login"
                                  className={`btn ${location.pathname === '/login' ? 'btn-primary' : 'btn-outline-primary'} mx-3`}>LOG
                                IN</Link>
                            <Link to="/signup"
                                  className={`btn ${location.pathname === '/signup' ? 'btn-primary' : 'btn-outline-primary'} mx-3`}>SIGN
                                UP</Link>
                        </div>
                    }
                    {
                        localStorage.getItem('authToken') &&
                        <button onClick={() => {
                            localStorage.clear();
                            showAlert("Log out succesfully", 'success');
                            history('/login');
                        }} className="btn btn-outline-danger mx-3">LOG Out</button>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;