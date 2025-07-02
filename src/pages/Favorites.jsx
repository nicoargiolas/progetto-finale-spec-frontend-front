import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { NavLink } from "react-router-dom";

// Importo componente
import PlayerRow from "../components/PlayerRow";

export default function Favorites() {
    const { favorites, isFavorite, handleToggle } = useContext(GlobalContext);

    return (
        <>
            <h1> Preferiti </h1>
            <div className="player-list">
                {favorites.map(p => <PlayerRow key={p.id} {...p} />)}
            </div>
        </>
    )
}