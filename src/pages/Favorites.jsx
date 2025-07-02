import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { NavLink } from "react-router-dom";

export default function Favorites() {
    const { favorites, isFavorite, handleToggle } = useContext(GlobalContext);

    return (
        <>
            <h1> Preferiti </h1>
            <ul>
                {favorites.map(p => <li key={p.id}>
                    <NavLink to={`/players/${p.id}`}>{p.title}</NavLink>
                    <span>{p.category} </span>
                    <button onClick={() => handleToggle(p)}>
                        {isFavorite(p.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                    </button>
                </li>)}
            </ul>
        </>
    )
}