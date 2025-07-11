import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <>
            {/* Header diviso in due: parte sinistra i link e parte destra il logo */}
            <header>
                <div className="header-left">
                    <NavLink to={"/"} className="nav-link"><h3> HOME </h3></NavLink>
                    <NavLink to={"/compare"} className="nav-link"><h3> CONFRONTA </h3></NavLink>
                    <NavLink to={"/favorites"} className="nav-link"><h3> PREFERITI </h3></NavLink>
                </div>
                <div className="header-right">
                    <img className="logo" src="/images/logo.PNG" alt="" />
                </div>
            </header>
        </>
    )
}