import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [players, setPlayers] = useState([]);

    // Fetch per i giocatori
    async function fetchJson(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    async function getPlayers() {
        try {
            const response = await fetchJson(`${import.meta.env.VITE_API_URL}/players`);
            setPlayers(response)
        } catch (error) {
            throw new Error(`Impossibile recuperare i giocatori`);
        }
    }

    useEffect(() => {
        getPlayers();
    }, []);

    useEffect(() => {
        console.log("Giocatori aggiornati", players);
    }, [players]);


    // Gestione favorites
    // Funzione che li prende da local storage
    const getFavorites = () => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    }

    // Setto i favorites
    const [favorites, setFavorites] = useState(getFavorites());

    // Cambio i dati in localstorage al cambiare dei favorites
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Funzione per aggiungere
    const addFavorite = (player) => {
        // Setto ai precedenti più il nuovo con un controllo se ci sia già di restituire lo stesso array per evitare duplicati
        setFavorites(prev => {
            if (prev.some(p => p.id === player.id)) return prev;
            return [...prev, player];
        });
    }

    // Funzione per rimuovere con filter
    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(p => p.id !== id))
    }

    // Funzione isFavorite con some
    const isFavorite = (id) => {
        return favorites.some(p => p.id === id)
    }

    // Gestione toggle
    const handleToggle = (player) => {
        isFavorite(player.id) ? removeFavorite(player.id) : addFavorite(player);
    }

    // Ritorno il provider con l'esportazione di players, favorites e funzioni
    return (
        <GlobalContext.Provider value={{
            players,
            favorites,
            isFavorite,
            handleToggle
        }}>
            {children}
        </GlobalContext.Provider>
    );
}