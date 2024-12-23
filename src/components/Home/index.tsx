import { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Game from "../Game"
import User from "../User"

function Home() {

    const [gameSearchInput, setGameSearchInput] = useState<string>('')
    const [gameSearchResult, setGameSearchResult] = useState<Array<string>>([])
    const [userSearchInput, setUserSearchInput] = useState<string>('')
    const [userSearchResult, setUserSearchResult] = useState<string>('cattriona')

    function gameSearchSubmit(e: FormEvent) {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            gameSearch: { value: string }
        }
        const searchInput = target.gameSearch.value
        setGameSearchInput(searchInput)
    }

    function userSearchSubmit(e: FormEvent) {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            userSearch: { value: string }
        }
        const searchInput = target.userSearch.value
        setUserSearchInput(searchInput)
    }

    useEffect(() => {
        let gameSearchUrl = `https://www.boardgamegeek.com/xmlapi2/search?query=`
        if (gameSearchInput != '') {
            gameSearchUrl += gameSearchInput
        }
        fetch(`${gameSearchUrl}`)
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
            })

        let userSearchUrl = `https://www.boardgamegeek.com/xmlapi2/user?name=`
        if (userSearchInput != '') {
            userSearchUrl += userSearchInput
        }
        setUserSearchResult(userSearchInput)
        fetch(`${userSearchUrl}`)
            .then(res => {
                return res.text()
            })
            .then(data => {
                console.log(data)
                const parser = new DOMParser()
                const xmlDoc = parser.parseFromString(data, "text/xml")
                const nodes: any = xmlDoc.documentElement.childNodes;
            })
    }, [setGameSearchResult, setUserSearchResult])

    return (
        <div>
            <Link to="/"><p className="">Home</p></Link>
            <form onSubmit={gameSearchSubmit}>
                <label htmlFor="gameSearch">Search for a game:</label>
                <input name="gameSearch" id="gameSearch" type="text" placeholder="Search game..."></input>
                <button type="submit">Search Game</button>
            </form>
            <div>
                {gameSearchResult.map((game: any) => {
                    return (
                        <Game key={game} id={game} />
                    )
                })}
            </div>
            <form onSubmit={userSearchSubmit}>
                <label htmlFor="userSearch">Search for a user:</label>
                <input name="userSearch" id="userSearch" type="text" placeholder="Search user..."></input>
                <button type="submit">Search User</button>
            </form>
                <User username={userSearchResult} />
        </div >
    )
}

export default Home