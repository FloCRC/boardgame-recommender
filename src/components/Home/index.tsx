import { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Game from "../Game"
import User from "../User"
import { Button } from "@chakra-ui/react"

function Home() {

    const [gameSearchInput, setGameSearchInput] = useState<string>('')
    const [gameSearchResult, setGameSearchResult] = useState<Array<string>>([])
    const [userSearchInput, setUserSearchInput] = useState<string>('')
    const [userSearchResult, setUserSearchResult] = useState<string>('mooseface')

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
        gameSearchUrl += gameSearchInput
        fetch(`${gameSearchUrl}`)
            .then(res => {
                return res.text()
            })
            .then(data => {
                if (data == '<?xml version="1.0" encoding="utf-8"?><items total="0" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">							</items>') {
                    setGameSearchResult([]);
                }
                else {
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
                }
            })
        if (userSearchInput != '') {
            setUserSearchResult(userSearchInput)
        }
    }, [gameSearchInput, userSearchInput])

    return (
        <div className="m-2">
            <form onSubmit={gameSearchSubmit}>
                <label htmlFor="gameSearch">Search for a game:</label>
                <input name="gameSearch" id="gameSearch" type="text" placeholder="Search game..." className="ml-1"></input>
                <Button type="submit" colorPalette={"cyan"} variant={"surface"} className="p-2">Search Game</Button>
            </form>
            {gameSearchResult.length < 1 ? <h1>No Games found</h1> : <h1>Game Search Results:</h1>}
            <div className="grid grid-cols-5 m-2">
                {gameSearchResult.map((game: any) => {
                    return (
                        <Game key={game} id={game} />
                    )
                })}
            </div>
            <form onSubmit={userSearchSubmit}>
                <label htmlFor="userSearch">Search for a user:</label>
                <input name="userSearch" id="userSearch" type="text" placeholder="Search user..." className="ml-1"></input>
                <Button type="submit" colorPalette={"cyan"} variant={"surface"} className="p-2">Search User</Button>
            </form>
            <User username={userSearchResult} />
        </div >
    )
}

export default Home