import { useEffect, useState } from "react"

interface Game {
    averageRating: number,
    bggRating: number,
    forTrade: boolean,
    gameId: number,
    image: string,
    isExpansion: boolean,
    maxPlayers: number,
    minPlayers: number,
    name: string,
    numPlays: number,
    owned: boolean,
    playingTime: number,
    preOrdered: boolean,
    previousOwned: boolean,
    rank: number,
    rating: number,
    thumbnail: string,
    userComment: string,
    want: boolean,
    wantToBuy: boolean,
    wantToPlay: boolean,
    wishlist: boolean,
    yearPublished: number
}

type Props = {
    username: string
}

function User({ username }: Props) {


    const [userGamesPlayed, setUserGamesPlayed] = useState<Array<Game>>([])
    useEffect(() => {
        fetch(`https://bgg-json.azurewebsites.net/collection/${username}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                for (let key in data) {
                    setUserGamesPlayed((prevArray: Array<any>) => [...prevArray, data[key]])
                }
            })
        console.log(userGamesPlayed)
    }, [])

    return (
        <div>
            <p>User: {username}</p>
            <p>Games Played:</p>
            <div className="grid grid-cols-5 m-2">
                {userGamesPlayed.map((game: any) => {
                    return (
                        <div key={game.gameId}>
                            <p>{game.name}</p>
                            <a href={`https://boardgamegeek.com/boardgame/${game.gameId}`} target="_blank"><img src={game.image} className="max-w-40 max-h-40" /></a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default User