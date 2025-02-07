import { Button, Card, Center, Image, Link, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

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
    }, [username])

    return (
        <div>
            <p>User: {username}</p>
            <p>Games Played:</p>
            <div className="grid grid-cols-5 m-2">
                {userGamesPlayed.map((game: any) => {
                    return (
                        <Card.Root maxW="sm" overflow="hidden" key={game.gameId} className="m-2 p-2 bg-gray-700 shadow-lg">
                            <Center><Image src={game.image} alt="Boardgame Box Art" className="max-w-40 max-h-40" fit="contain" /></Center>
                            <Card.Body gap="2">
                                <Center><Card.Title>{game.name}</Card.Title></Center>
                            </Card.Body>
                            <Link href={`https://boardgamegeek.com/boardgame/${game.gameId}`} className="flex justify-end" target="blank"><Button variant="surface" className="p-2 bg-blue-300 text-gray-700 hover:bg-blue-200 hover:shadow">BGG Entry</Button></Link>
                        </Card.Root>
                    )
                })}
            </div>
        </div>
    )
}

export default User