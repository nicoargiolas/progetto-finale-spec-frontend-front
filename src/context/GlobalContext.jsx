import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [players, setPlayers] = useState([]);

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
    }, [players])

    return (
        <GlobalContext.Provider value={{ players }}>
            {children}
        </GlobalContext.Provider>
    );
}