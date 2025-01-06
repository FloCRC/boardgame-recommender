import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import User from "./components/User";
import Home from "./components/Home";

function App() {

    return (
        <div className="p-2 bg-gray-400">
            <BrowserRouter>
                <Link to="/"><h1 className="text-lg">Boardgames</h1></Link>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
