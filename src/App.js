import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotesState from "./context/notes/NotesState";
import About from "./componenets/About";
import Navbar from "./componenets/Navbar";
import Home from "./componenets/Home";

function App() {
    return (
        <>
            <NotesState>
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/about" element={<About/>}/>
                    </Routes>
                </BrowserRouter>
            </NotesState>
        </>
    );
}

export default App;
