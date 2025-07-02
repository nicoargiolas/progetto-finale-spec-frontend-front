import { memo, useContext } from "react";
import { NavLink } from 'react-router-dom';

import { GlobalContext } from "../context/GlobalContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

function PlayerRow(p) {
    const { isFavorite, handleToggle } = useContext(GlobalContext);

    return (
        <>
            <div
                className={`player-card ${p.category === "ATP" ? "atp" : "wta"}`}
            >
                <div className="player-info">
                    <NavLink to={`/players/${p.id}`} className="player-name">
                        {p.title}
                    </NavLink>
                    <button className="star-button" onClick={() => handleToggle(p)}>
                        <FontAwesomeIcon
                            icon={isFavorite(p.id) ? solidStar : regularStar}
                            className={isFavorite(p.id) ? "favorite" : ""}
                        />
                    </button>
                </div>
            </div>
        </>
    )
}

export default memo(PlayerRow)