import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function ComparePage() {
    const { players } = useContext(GlobalContext);
    const [selectedPlayer1, setSelectedPlayer1] = useState(null);
    const [selectedPlayer2, setSelectedPlayer2] = useState(null)

    // Recupero lo stato passato dalla pagina se accedo da la a questa pagina
    const location = useLocation();
    useEffect(() => {
        if (location.state?.player) {
            setSelectedPlayer1(location.state.player);
        }
    }, [location.state]);

    console.log(players);


    return (
        <>
            {!selectedPlayer1 ?
                <section>
                    <select onChange={e => {
                        setSelectedPlayer1(players.find(p => p.id === parseInt(e.target.value)))
                    }}>
                        <option value=""> </option>
                        {players.map(p => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                    </select>
                </section>
                :
                <div className="player-column">
                    Giocatore 1 selezionato
                </div>
            }
            {!selectedPlayer2 ?
                <section>
                    <select onChange={e => {
                        setSelectedPlayer2(players.find(p => p.id === parseInt(e.target.value)))
                    }}>
                        <option value=""> </option>
                        {players.map(p => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                    </select>
                </section>
                :
                <div className="player-column">
                    Giocatore 2 selezionato
                </div>
            }
        </>
    )
}