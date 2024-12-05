import { ChangeEvent, FormEvent, FormEventHandler, SyntheticEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {

    const [gameSearchResult, setGameSearchResult] = useState('')
    // const [userSearchResult, setUserSearchResult] = useState('')

    function gameSearchSubmit(e: FormEvent) {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            gameSearch: { value: string }
        }
        const gameSearchInput = target.gameSearch.value
        setGameSearchResult(gameSearchInput)
    }

    useEffect(() => {
        let gameSearchUrl = `https://www.boardgamegeek.com/xmlapi2/search?query=`
        if (gameSearchResult != '') {
            gameSearchUrl += gameSearchResult
        }
        else {
            gameSearchUrl += 'harmonies'
        }
        fetch(`https://www.boardgamegeek.com/xmlapi2/search?query=${gameSearchResult}`)
            .then(res => {
                return res.text()
            })
            .then(data => {
                console.log(data)
            })
    }, [gameSearchSubmit])

    console.log(gameSearchResult)

    return (
        <div>
            <Link to="/"><p className="">Home</p></Link>
            <form onSubmit={gameSearchSubmit}>
                <label htmlFor="gameSearch">Search for a game:</label>
                <input name="gameSearch" id="gameSearch" type="text" placeholder="Search game..."></input>
                <button type="submit">Search Game</button>
            </form>
            {/* <form>
                <label htmlFor="userSearch">Search for a user:</label>
                <input onChange={userSearchInput} name="userSearch" id="userSearch" type="text" placeholder="Search user..."></input>
                <Link to="/user"><p>Search User</p></Link>
            </form> */}
        </div >
    )
}

export default Home