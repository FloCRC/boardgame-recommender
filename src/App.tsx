import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Provider } from "./components/ui/provider";

function App() {

    return (
        <Provider>
            <div className="p-2">
                <BrowserRouter>
                    <Link to="/"><h1 className="text-lg">Boardgames</h1></Link>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default App
