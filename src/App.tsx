import Game from "./components/Game";
import User from "./components/User";

function App() {

    return (
        <>
            <h1 className="text-red-300">Boardgames</h1>
            <Game id="31260" />
            <User username="mooseface" />
        </>
    )
}

export default App
