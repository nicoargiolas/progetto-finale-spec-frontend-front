import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header>
                <NavLink to={"/"}><h3> HOME </h3></NavLink>
                <NavLink to={"/compare"}><h3> CONFRONTA </h3></NavLink>
                <NavLink to={"/favorites"}><h3> PREFERITI </h3></NavLink>
            </header>
        </>
    )
}