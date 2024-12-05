import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function Game() {

    interface Game {
        artists: Array<string>,
        averageRating: number,
        bggRating: number,
        description: string,
        designers: Array<string>,
        gameId: number,
        image: string,
        isExpansion: boolean,
        maxPlayers: number,
        mechanics: Array<string>,
        minPlayers: number,
        name: string,
        playerPollResults: Array<object>,
        playingTime: number,
        publishers: Array<string>,
        rank: number,
        thumbnail: string,
        yearPublished: number
    }

    const { gameId } = useParams()

    const [game, setGame] = useState<Game>({
        artists: ["Bruce Brenneise", "Jose David Lanza Cebrian", "Anailis Dorta"],
        averageRating: 8.77092,
        bggRating: 7.39715,
        description: "Slay the Spire: The Board Game is a co-operative deck-building adventure. Craft a unique deck, encounter bizarre creatures, discover relics of immense power, and finally become strong enough to slay the Spire! Slay the Spire: The Board Game, (core edition) includes: -4 Minis, -Over 730 cards, -Over 450 Art Sleeves, -2 Map Boards, -1 Merchant Board, -4 Player Boards, -1 Die, -50 plastic cubes, -Over 113 tokens, Collector's edition: 4x (3mm neoprene) playermats, 1x deck playmat, Bigger box (fits mats), 1x Merchant bag, Metal coins, Kickstarter exclusives and Stretch goals: 1x Merchant pat, Claw die, 8x Claw cards, 28x Foil Cards, 3x Acrylic heart tokens, More details on Kickstarter http://kck.st/3NrGwS5&",
        designers: ["Gary Dworetsky", "Anthony Giovannetti", "Casey Yano"],
        gameId: 338960,
        image: "https://cf.geekdo-images.com/PQzVclEoOQ_wr4e1V86kxA__original/img/KXOf1hP1cIJQLabKhZulWP-e9wI=/0x0/filters:format(png)/pic8157856.png",
        isExpansion: false,
        maxPlayers: 4,
        mechanics: ["Cooperative Game", "Deck, Bag, and Pool Building", "Dice Rolling", "Hand Management", "Solo / Solitaire Game"],
        minPlayers: 1,
        name: "Slay the Spire: The Board Game",
        playerPollResults: [{ best: 26, notRecommended: 17, numPlayers: 1, numPlayersIsAndHigher: false, recommended: 76 },
        { best: 95, notRecommended: 3, numPlayers: 2, numPlayersIsAndHigher: false, recommended: 29 },
        { best: 41, notRecommended: 10, numPlayers: 3, numPlayersIsAndHigher: false, recommended: 66 },
        { best: 17, notRecommended: 32, numPlayers: 4, numPlayersIsAndHigher: false, recommended: 61 },
        { best: 1, notRecommended: 80, numPlayers: 4, numPlayersIsAndHigher: false, recommended: 0 }],
        playingTime: 150,
        publishers: ["Contention Games", "Ediciones MasQueOca", "Grok Games", "Korea Boardgames", "Nice Game Publishing", "Yayoi The Dreamer", "YOKA Games"],
        rank: 169,
        thumbnail: "https://cf.geekdo-images.com/PQzVclEoOQ_wr4e1V86kxA__thumb/img/cpmsSDagE5RvQ1ERXl-fMJIaUUg=/fit-in/200x150/filters:strip_icc()/pic8157856.png",
        yearPublished: 2024
    })

    useEffect(() => {
        fetch(`https://bgg-json.azurewebsites.net/thing/${gameId}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setGame(data)
            })
    }, [])

    return (
        <div>
            <h3 className="">{game.name}</h3>
            <p>Players: {game.minPlayers} - {game.maxPlayers}</p>
            <img src={game.image} alt="Image of Game Box" className="w-24 h-24" />
        </div >
    )
}

export default Game