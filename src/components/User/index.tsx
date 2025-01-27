import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

type Props = {
    username: string
}

function User({ username }: Props) {

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

    const [userGamesPlayed, setUserGamesPlayed] = useState<Array<Game>>([])

    useEffect(() => {
        fetch(`https://bgg-json.azurewebsites.net/collection/${username}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                let array = []
                for (let key in data) {
                    array.push(data[key])
                }
                setUserGamesPlayed(array)
            })
    }, [userGamesPlayed])

    return (
        <div>
            <p>User: {username}</p>
            <p>Games Played:</p>
            <div className="grid grid-cols-5 m-2">
                {userGamesPlayed.map((game: any) => {
                    return (
                        <div key={game.image} className="m-1 p-1 border flex flex-col items-center bg-gray-300">
                            <p>{game.name}</p>
                            <p>User Rating: {game.rating}/10</p>
                            <img src={game.image} className="max-w-40 max-h-40" />
                            <a href={`https://boardgamegeek.com/boardgame/${game.gameId}`} target="_blank">BoardGameGeek Entry</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default User