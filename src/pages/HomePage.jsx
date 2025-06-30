import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { NavLink } from "react-router-dom";

export default function HomePage() {
    const { players } = useContext(GlobalContext);
    return (
        <>
            <div className="player-list">
                <ul>
                    {players.map(p => <NavLink to={`/players/${p.id}`}
                        key={p.id}><li>{p.title} <span>{p.category} </span></li></NavLink>)}
                </ul>
            </div>
        </>
    )
}