import { memo } from "react";
import { NavLink } from 'react-router-dom';

import Star from "./Star";

// Funzione PlayerRow che prende il player
// Utilizzata nella Home e in Favorites
function PlayerRow(p) {

    return (
        <>
            <div
                className={`player-card ${p.category === "ATP" ? "atp" : "wta"}`}
            >
                <div className="player-info">
                    <NavLink to={`/players/${p.id}`} className="player-name">
                        {p.title}
                    </NavLink>
                    <Star player={p} />
                </div>
            </div>
        </>
    )
}

// Esporto con memo per evitare render inutili
export default memo(PlayerRow)