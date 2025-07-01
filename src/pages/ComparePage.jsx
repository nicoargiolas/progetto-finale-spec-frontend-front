import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function ComparePage() {
    const { players } = useContext(GlobalContext);
    const [selectedPlayer1, setSelectedPlayer1] = useState(null);
    const [selectedPlayer2, setSelectedPlayer2] = useState(null)

    // Recupero lo stato passato dalla pagina se accedo da la a questa pagina
    const location = useLocation();
    useEffect(() => {
        if (location.state?.player) {
            setSelectedPlayer1(location.state.player);
        }
    }, [location.state]);

    async function fetchJson(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    async function getPlayer(id) {
        try {
            const response = await fetchJson(`${import.meta.env.VITE_API_URL}/players/${id}`);
            if (response.success) {
                return (response.player)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Array di oggetti per rendere il codice più DRY facendo un map per ogni chiave dell'oggetto player e mettendo nella colonna di sinistra la label corrispondente
    const fieldsToCompare = [
        { key: "category", label: "Categoria" },
        { key: "age", label: "Età" },
        { key: "country", label: "Nazionalità" },
        { key: "gender", label: "Sesso" },
        { key: "dominantHand", label: "Mano dominante" },
        { key: "backhand", label: "Rovescio" },
        { key: "heightCm", label: "Altezza" },
        { key: "weightKg", label: "Peso" },
        { key: "debutYear", label: "Anno di debutto" },
        { key: "ranking", label: "Ranking" },
        { key: "bestRanking", label: "Best Ranking" },
        { key: "tourTitles", label: "Titoli" },
        { key: "bigTitles", label: "Big Titles" },
        { key: "grandSlamTitles.total", label: "Grand Slam" },
        { key: "grandSlamTitles.australianOpen", label: "Australian Open" },
        { key: "grandSlamTitles.rolandGarros", label: "Roland Garros" },
        { key: "grandSlamTitles.wimbledon", label: "Wimbledon" },
        { key: "grandSlamTitles.usOpen", label: "US Open" },
        { key: "master1000Titles", label: "Master 1000" },
        { key: "atp500Titles", label: "ATP 500" },
        { key: "atp250Titles", label: "ATP 250" },
        { key: "atpFinalsTitles", label: "ATP Finals" },
        { key: "olympicGolds", label: "Ori olimpici" },
        { key: "favouriteSurface", label: "Superficie preferita" },
        { key: "racket", label: "Racchetta" },
        { key: "shoes", label: "Scarpe" },
        { key: "clothing", label: "Abbigliamento" },
        { key: "coach", label: "Coach" },
        { key: "firstNumberOneDate", label: "Prima volta al #1" }
    ];

    // Funzione che accede alle proprietà annidate come "grandSlamTitles.total" che trasforma in [grandSlamTitles][total] per permettere di accedervi
    function getNestedValue(obj, path) {
        return path.split(".").reduce((acc, part) => acc?.[part], obj);
    }

    return (
        <>
            <div className="compare">
                <table className="compare-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                                {selectedPlayer1 ? (
                                    <div>
                                        <span>{selectedPlayer1.title}</span>
                                        <button onClick={() => setSelectedPlayer1(null)}> Rimuovi </button>
                                    </div>
                                ) :
                                    <section>
                                        <select onChange={e => {
                                            getPlayer(e.target.value).then(p => {
                                                setSelectedPlayer1(p)
                                            })
                                        }}>
                                            <option value=""> </option>
                                            {players.map(p => (
                                                <option key={p.id} value={p.id}>{p.title}</option>
                                            ))}
                                        </select>
                                    </section>}
                            </th>
                            <th>
                                {selectedPlayer2 ? (
                                    <div>
                                        <span>{selectedPlayer2.title}</span>
                                        <button onClick={() => setSelectedPlayer2(null)}> Rimuovi </button>
                                    </div>
                                ) :
                                    <section>
                                        <select onChange={e => {
                                            getPlayer(e.target.value).then(p => {
                                                setSelectedPlayer2(p)
                                            })
                                        }}>
                                            <option value=""> </option>
                                            {players.map(p => (
                                                <option key={p.id} value={p.id}>{p.title}</option>
                                            ))}
                                        </select>
                                    </section>}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fieldsToCompare.map(({ key, label }) => {
                            // Se il player è selezionato esiste accede alla proprietà richiesta, anche se è annidata, altrimenti stampa "-"
                            const value1 = selectedPlayer1 ? getNestedValue(selectedPlayer1, key) : "-";
                            const value2 = selectedPlayer2 ? getNestedValue(selectedPlayer2, key) : "-";

                            return (
                                <tr key={key}>
                                    <td><strong>{label}</strong></td>
                                    {/* Se il valore è un array lo trasformo in stringa divisa da ", " altrimenti stampo il valore, se è null o undefined stampo "-" */}
                                    <td>{Array.isArray(value1) ? value1.join(", ") : (value1 ?? "-")}</td>
                                    <td>{Array.isArray(value2) ? value2.join(", ") : (value2 ?? "-")}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </>
    )
}