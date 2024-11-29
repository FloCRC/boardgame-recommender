import { useState, useEffect } from "react"

type Props = {
    id: string
}

function Game({ id }: Props) {

    const [game, setGame]: any = useState('')
    const [expansions, setExpansions]: any = useState([])

    useEffect(() => {
        fetch(`https://bgg-json.azurewebsites.net/thing/${id}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setGame(data)
                setExpansions(data.expansions)
                console.log(data)
            })
    }, [])

    return (
        <div>
            <h3 className="text-red-300">{game.name}</h3>
            <p>Players: {game.minPlayers} - {game.maxPlayers}</p>
            <img src={game.image} alt="Image of Game Box" className="w-24 h-24" />
            <p className="whitespace-pre-line">{String(game.description).replace(/&#\d{2};/g, "\n")}</p>
            <p>Available expansions:</p>
            {expansions.map((expansion: any) => { return <p key={expansion.gameId}>{expansion.name}</p> })}
        </div >
    )
}

export default Game