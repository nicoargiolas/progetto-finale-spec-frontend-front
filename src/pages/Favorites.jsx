import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

// Importo componente
import PlayerRow from "../components/PlayerRow";

export default function Favorites() {
    const { favorites } = useContext(GlobalContext);

    return (
        <>
            <h1> Preferiti </h1>
            {(favorites.length === 0) ?
                <h2> La lista dei preferiti è vuota </h2> :
                (<div className="player-list">
                    {favorites.map(p => <PlayerRow key={p.id} {...p} />)}
                </div>)
            }
        </>
    )
}