import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotesState from "./context/notes/NotesState";
import Navbar from "./componenets/Navbar";
import Home from "./componenets/Home";
import Alert from "./componenets/Alert";
import Login from "./componenets/Login";
import SignUp from "./componenets/SignUp";

function App() {
    return (
        <>
            <NotesState>
                <BrowserRouter>
                    <Navbar/>
                    <Alert/>
                    <div className="container">
                        <Routes>
                            <Route exact path="/" element={<Home/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/signup" element={<SignUp/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </NotesState>
        </>
    );
}

export default App;
