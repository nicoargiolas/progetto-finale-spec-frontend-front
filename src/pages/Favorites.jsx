import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

// Importo componente
import PlayerRow from "../components/PlayerRow";

export default function Favorites() {
    // Prendo i favorites dal context
    const { favorites } = useContext(GlobalContext);

    return (
        <>
            <div className="favorites-page">
                {(favorites.length === 0) ?
                    <h2> La lista dei preferiti è vuota </h2> :
                    (<>
                        <h2> Preferiti </h2>
                        <div className="player-list">
                            {favorites.map(p => <PlayerRow key={p.id} {...p} />)}
                        </div>
                    </>)
                }
            </div>
        </>
    )
}