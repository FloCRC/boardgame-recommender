import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Provider } from "./components/ui/provider";

function App() {

    return (
        <Provider>
            <div className="bg-gray-500 shadow">
                <BrowserRouter>
                    <header className="p-2 border-b bg-blue-300 text-gray-700 font-bold">
                        <Link to="/"><h1 className="text-lg">Boardgames</h1></Link>
                    </header>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default App
