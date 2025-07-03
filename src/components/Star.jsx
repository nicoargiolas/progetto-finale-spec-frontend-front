import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

export default function Star({ player }) {
    const { isFavorite, handleToggle } = useContext(GlobalContext);

    return (
        <>
            <button className="star-button" onClick={() => handleToggle(player)}>
                <FontAwesomeIcon
                    icon={isFavorite(player.id) ? solidStar : regularStar}
                    className={isFavorite(player.id) ? "favorite" : ""}
                />
            </button>
        </>)
}