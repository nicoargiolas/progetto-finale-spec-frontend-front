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
    const getFavorites = () => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    }

    const [favorites, setFavorites] = useState(getFavorites());

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (player) => {
        setFavorites(prev => {
            if (prev.some(p => p.id === player.id)) return prev;
            return [...prev, player];
        });
    }

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(p => p.id !== id))
    }

    const isFavorite = (id) => {
        return favorites.some(p => p.id === id)
    }

    const handleToggle = (player) => {
        isFavorite(player.id) ? removeFavorite(player.id) : addFavorite(player);
    }

    return (
        <GlobalContext.Provider value={{
            players,
            favorites,
            addFavorite,
            removeFavorite,
            isFavorite,
            handleToggle
        }}>
            {children}
        </GlobalContext.Provider>
    );
}