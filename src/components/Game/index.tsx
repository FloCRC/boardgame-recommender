import { useState, useEffect } from "react"

type Props = {
    id: string
}

function Game({ id }: Props) {

    const [game, setGame]: any = useState('')

    useEffect(() => {
        fetch(`https://bgg-json.azurewebsites.net/thing/${id}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setGame(data)
                console.log(data)
            })
    }, [])

    return (
        <div>
            <h3 className="text-red-300">{game.name}</h3>
            <p>Players: {game.minPlayers} - {game.maxPlayers}</p>
            <img src={game.image} alt="Image of Game Box" className="w-24 h-24" />
        </div >
    )
}

export default Game