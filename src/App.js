import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotesState from "./context/notes/NotesState";
import About from "./componenets/About";
import Navbar from "./componenets/Navbar";
import Home from "./componenets/Home";
import Alert from "./componenets/Alert";

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
                            <Route exact path="/about" element={<About/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </NotesState>
        </>
    );
}

export default App;
