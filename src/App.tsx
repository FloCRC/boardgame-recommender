import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import User from "./components/User";
import Home from "./components/Home";

function App() {

    return (
        <BrowserRouter>
            <Link to="/"><h1 className="text-lg">Boardgames</h1></Link>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/game" element={<Game id="31260" />}></Route>
                <Route path="/user" element={<User username="mooseface" />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
