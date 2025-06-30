import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function PlayerDetails() {
    const { id } = useParams();
    const [player, setPlayer] = useState({});

    async function fetchJson(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    async function getPlayer(id) {
        try {
            const response = await fetchJson(`${import.meta.env.VITE_API_URL}/players/${id}`);
            if (response.success) {
                setPlayer(response.player)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPlayer(id)
    }, []);

    return (
        <>
            <div className="player-detail">
                <h1>{player.title}</h1>
                <img src={player.image || '/placeholder.jpg'} alt={player.title} />

                <div><strong>Ranking attuale:</strong> {player.ranking}</div>
                <div><strong>Best Ranking:</strong> {player.bestRanking}</div>
                {player.firstNumberOneDate && <div><strong>Data prima volta #1:</strong> {player.firstNumberOneDate}</div>}

                <div><strong>Età:</strong> {player.age} anni</div>
                <div><strong>Nazione:</strong> {player.country}</div>
                <div><strong>Altezza:</strong> {player.heightCm} cm</div>
                <div><strong>Peso:</strong> {player.weightKg} kg</div>
                <div><strong>Anno debutto:</strong> {player.debutYear}</div>
                <div><strong>Mano dominante:</strong> {player.dominantHand}</div>
                <div><strong>Backhand:</strong> {player.backhand}</div>
                <div><strong>Superficie preferita:</strong> {player.favouriteSurface.join(", ")}</div>

                <div><strong>Titoli totali nel tour:</strong> {player.tourTitles}</div>
                <div><strong>Big Titles:</strong> {player.bigTitles}</div>
                <ul>
                    <strong>Grand Slam Titles: {player.grandSlamTitles.total}</strong>
                    <li>Australian Open: {player.grandSlamTitles.australianOpen}</li>
                    <li>Roland Garros: {player.grandSlamTitles.rolandGarros}</li>
                    <li>Wimbledon: {player.grandSlamTitles.wimbledon}</li>
                    <li>US Open: {player.grandSlamTitles.usOpen}</li>
                </ul>
                <div><strong>Master 1000:</strong> {player.master1000Titles}</div>
                <div><strong>ATP Finals:</strong> {player.atpFinalsTitles}</div>
                <div><strong>Ori olimpici:</strong> {player.olympicGolds}</div>
                <div><strong>ATP 500:</strong> {player.atp500Titles}</div>
                <div><strong>ATP 250:</strong> {player.atp250Titles}</div>

                <div><strong>Racchetta:</strong> {player.racket}</div>
                <div><strong>Scarpe:</strong> {player.shoes}</div>
                <div><strong>Abbigliamento:</strong> {player.clothing}</div>

                <div>
                    <strong>Allenatori:</strong> {player.coach.join(" & ")}
                </div>

                <div>
                    <button> Confronta </button>
                </div>
            </div>

        </>
    )
}