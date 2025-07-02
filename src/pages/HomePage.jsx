import { useContext, useEffect, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { NavLink } from "react-router-dom";

// Importo componenti
import PlayerRow from "../components/PlayerRow";

export default function HomePage() {
    const { players } = useContext(GlobalContext);
    const [playersToShow, setPlayersToShow] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState(1);
    const [sortBy, setSortBy] = useState("category");

    // FILTRI
    useEffect(() => {
        setPlayersToShow(players)
    }, [players]);

    async function fetchJson(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data
    };

    async function applyFilters(query, category) {
        // Se la query è vuota e la categoria è tutte setto direttamente con tutti i giocatori e faccio return
        if (query.trim() === "" && category === "all") {
            setPlayersToShow(players);
            return;
        }

        // Inizializzo l'URL
        let url = `${import.meta.env.VITE_API_URL}/players`;
        // Se la query esiste la aggiungo all'url
        if (query.trim() !== "") {
            url += `?search=${query.trim()}`
        }
        // Se la categoria e la query esistono aggiungo category con &
        if (category !== "all" && query.trim() !== "") {
            url += `&category=${category}`
        }
        // Se la categoria esiste ma la query non esiste aggiungo category con ?
        else if (category !== "all" && query.trim() === "") {
            url += `?category=${category}`
        }

        try {
            const response = await fetchJson(url);
            setPlayersToShow(response)
        } catch (error) {
            console.error(`Impossibile recuperare i giocatori: ${error}`);
        }
    }


    // ORDINAMENTO
    const handleSort = (rule) => {
        if (rule === sortBy) {
            setSortOrder(sortOrder * -1)
        } else {
            setSortBy(rule);
            setSortOrder(1);
        };
    };

    const sortedPlayers = useMemo(() => {
        return playersToShow.sort((a, b) => {
            let result = 0;

            if (sortBy === "title") {
                result = (a.title.localeCompare(b.title));
            } else if (sortBy === "category") {
                result = (a.category.localeCompare(b.category));
            }

            return result * sortOrder
        })
    }, [playersToShow, sortOrder, sortBy]);


    return (
        <>
            <div className="filter-bar">
                <input
                    className="search-input"
                    placeholder="Cerca..."
                    type="text"
                    value={searchQuery}
                    onChange={e => {
                        setSearchQuery(e.target.value);
                        applyFilters(e.target.value, selectedCategory);
                    }}
                />

                <select
                    className="category-select"
                    value={selectedCategory}
                    onChange={e => {
                        setSelectedCategory(e.target.value);
                        applyFilters(searchQuery, e.target.value);
                    }}
                >
                    <option value="all">Tutte</option>
                    <option value="ATP">ATP</option>
                    <option value="WTA">WTA</option>
                </select>

                <button className="sort-button" onClick={() => handleSort("title")}>
                    Ordina per nome
                </button>
                <button className="sort-button" onClick={() => handleSort("category")}>
                    Ordina per categoria
                </button>
            </div>


            <div className="player-list">
                {playersToShow.map(p => <PlayerRow key={p.id} {...p} />)}
            </div>
        </>
    )
}