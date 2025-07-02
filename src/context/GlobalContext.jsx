import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [players, setPlayers] = useState([]);
    const [favorites, setFavorites] = useState([]);

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


    // Gestione wishlist
    const addFavorite = (player) => {
        setFavorites(prev => [...prev, player])
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