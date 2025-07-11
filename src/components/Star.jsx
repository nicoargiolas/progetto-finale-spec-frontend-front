import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

// Importo le icone da font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

export default function Star({ player }) {
    // Prendo le funzioni isFavorite e handleToggle dal context
    const { isFavorite, handleToggle } = useContext(GlobalContext);

    return (
        <>
            {/* Al click sulla stella eseguo handleToggle */}
            <button className="star-button" onClick={() => handleToggle(player)}>
                <FontAwesomeIcon
                    // Se è tra i preferiti mostro la solidStar altrimenti la regular e imposto la classe dinamicamente
                    icon={isFavorite(player.id) ? solidStar : regularStar}
                    className={isFavorite(player.id) ? "favorite" : ""}
                />
            </button>
        </>)
}