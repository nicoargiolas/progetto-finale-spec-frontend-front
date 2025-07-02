import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header>
                <NavLink to={"/"} className="nav-link"><h3> HOME </h3></NavLink>
                <NavLink to={"/compare"} className="nav-link"><h3> CONFRONTA </h3></NavLink>
                <NavLink to={"/favorites"} className="nav-link"><h3> PREFERITI </h3></NavLink>
            </header>
        </>
    )
}