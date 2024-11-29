import { useEffect, useState } from "react"

type Props = {
    username: string
}

function User({ username }: Props) {


    const [userGamesPlayed, setUserGamesPlayed]: any = useState([])

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
    }, [])

    return (
        <div>
            <p>User: {username}</p>
            <p>Games Played:</p>
            {userGamesPlayed.map((game: any) => {
                return <p key={game.gameId}>{game.name}</p>
            })}
        </div>
    )
}

export default User