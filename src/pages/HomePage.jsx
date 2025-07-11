import { useContext, useEffect, useState, useMemo, useRef, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";

// Importo componenti
import PlayerRow from "../components/PlayerRow";

export default function HomePage() {
    // Prendo i players dal context
    const { players } = useContext(GlobalContext);

    // Stati
    const [playersToShow, setPlayersToShow] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState(1);
    const [sortBy, setSortBy] = useState("category");

    // Ref per input non controllato della searchbar
    const inputRef = useRef();


    // FILTRI
    // Setto i giocatori da mostare in lista con uno useEffect al cambiamento di players per aspettare la risposta della chiamata API
    useEffect(() => {
        setPlayersToShow(players)
    }, [players]);

    // Funzione per estrapolare i dati dalla risposta
    async function fetchJson(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data
    };

    // Funzione per applicare i filtri
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

        // Effettuo la chiamata all'url costruito precedentemente
        try {
            const response = await fetchJson(url);
            setPlayersToShow(response)
        } catch (error) {
            console.error(`Impossibile recuperare i giocatori: ${error}`);
        }
    }

    // DEBOUNCED SEARCH
    // Funzione di debounce
    function debounce(callback, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value)
            }, delay)
        }
    };

    // Uso il debounce sulla searchbar
    const debouncedSearch = useCallback(debounce(() => {
        setSearchQuery(inputRef.current.value);
        applyFilters(inputRef.current.value, selectedCategory);
    }, 500), []);


    // ORDINAMENTO
    // Funzione che gestisce l'ordinamento
    const handleSort = (rule) => {
        // Se la regola passata con il click è quella già selezionata inverto l'ordine
        if (rule === sortBy) {
            setSortOrder(sortOrder * -1)
        } else {
            // Altrimenti cambio sortBy con la regola selezionata e reimposto l'ordine crescente
            setSortBy(rule);
            setSortOrder(1);
        };
    };

    // Variabile sortedPlayers con useMemo per rimontare i componenti solo al cambiamento dell'ordine o dei giocatori da mostrare
    const sortedPlayers = useMemo(() => {
        return playersToShow.sort((a, b) => {
            let result = 0;

            // Se sortBy è titolo ordino per titolo con localCompare
            if (sortBy === "title") {
                result = (a.title.localeCompare(b.title));
            } else if (sortBy === "category") {
                // Se è category ordino per categoria
                result = (a.category.localeCompare(b.category));
            }

            // Moltiplico il risultato con sortOrder per invertire eventualmente l'ordinamento
            return result * sortOrder
        })
    }, [playersToShow, sortOrder, sortBy]);


    return (
        <>
            {/* Barra dei filtri */}
            <div className="filter-bar">
                {/* Searchbar */}
                <input
                    className="search-input"
                    placeholder="Cerca..."
                    type="text"
                    // Al cambio del valore eseguo la funzione debouncedSearch utilizzando un input non controllato
                    ref={inputRef}
                    onChange={() => debouncedSearch()}
                />

                {/* Category */}
                <select
                    className="category-select"
                    value={selectedCategory}
                    // Al cambio della categoria setto la categoria selezionata e eseguo applyFilters con la query e il valore della select
                    onChange={e => {
                        setSelectedCategory(e.target.value);
                        applyFilters(searchQuery, e.target.value);
                    }}
                >
                    <option value="all">Tutte</option>
                    <option value="ATP">ATP</option>
                    <option value="WTA">WTA</option>
                </select>

                {/* Bottoni ordinamento */}
                <button className="sort-button" onClick={() => handleSort("title")}>
                    Ordina per nome
                </button>
                <button className="sort-button" onClick={() => handleSort("category")}>
                    Ordina per categoria
                </button>
            </div>

            {/* Lista giocatori */}
            {(playersToShow.length === 0) ?
                <h2> Nessun risultato corrisponde ai criteri di ricerca </h2> :
                (<div className="player-list">
                    {/* Utilizzo map con il componente PlayerRow passando come props il player*/}
                    {playersToShow.map(p => <PlayerRow key={p.id} {...p} />)}
                </div>)}
        </>
    )
}