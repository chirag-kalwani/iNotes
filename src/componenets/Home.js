import Notes from "./Notes";

function Home() {
    return (
        <div className="my-3">
            {/*Notes is read all the notes from NotesState.js and render it*/}
            <Notes/>
        </div>
    );
}

export default Home;