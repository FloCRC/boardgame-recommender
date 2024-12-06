import { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Game from "../Game"

function Home() {

    const [gameSearchInput, setGameSearchInput] = useState<string>('')
    const [gameSearchResult, setGameSearchResult] = useState<Array<string>>([])
    // const [userSearchResult, setUserSearchResult] = useState('')

    function gameSearchSubmit(e: FormEvent) {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            gameSearch: { value: string }
        }
        const gameSearchInput = target.gameSearch.value
        setGameSearchInput(gameSearchInput)
    }

    useEffect(() => {
        let gameSearchUrl = `https://www.boardgamegeek.com/xmlapi2/search?query=`
        if (gameSearchInput != '') {
            gameSearchUrl += gameSearchInput
        }
        else {
            gameSearchUrl += 'harmonies'
        }
        fetch(`https://www.boardgamegeek.com/xmlapi2/search?query=${gameSearchInput}`)
            .then(res => {
                return res.text()
            })
            .then(data => {
                const parser = new DOMParser()
                const xmlDoc = parser.parseFromString(data, "text/xml")
                const gamesArray = []
                const nodes: any = xmlDoc.documentElement.childNodes;

                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];
                    if (node.nodeType == 1) {
                        gamesArray.push(node.id);
                    }
                }
                if (gamesArray.length > 0) {
                    setGameSearchResult(gamesArray)
                }
                console.log(gamesArray)

            })
    }, [setGameSearchResult]) 

    console.log(gameSearchResult)

    return (
        <div>
            <Link to="/"><p className="">Home</p></Link>
            <form onSubmit={gameSearchSubmit}>
                <label htmlFor="gameSearch">Search for a game:</label>
                <input name="gameSearch" id="gameSearch" type="text" placeholder="Search game..."></input>
                <button type="submit">Search Game</button>
            </form>
            <div>
                <Game id="173346" />
                {gameSearchResult.map((game: any) => {
                    return (
                        <Game key={game} id={game} />
                    )
                })}
            </div>
            {/* <form>
                <label htmlFor="userSearch">Search for a user:</label>
                <input onChange={userSearchInput} name="userSearch" id="userSearch" type="text" placeholder="Search user..."></input>
                <Link to="/user"><p>Search User</p></Link>
            </form> */}
        </div >
    )
}

export default Home