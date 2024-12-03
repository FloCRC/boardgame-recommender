import { Link } from "react-router-dom"

function Home() {

    return (
        <div>
            <Link to ="/"><p className="">Home</p></Link>
            <Link to="/game"><p>Game</p></Link>
            <Link to="/user"><p>User</p></Link>
        </div >
    )
}

export default Home