import { NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";

function LayoutDefault() {

    const navLinkActive = (e) => {
        return e.isActive ? "menu__link menu__link--active" : "menu__link";
    }

    return (
        <>
            <div className="layout-default">
                <header className="layout-default__header">
                    <div className="layout-default__logo">Quiz</div>
                    <div className="menu">
                        <ul>
                            <li>
                                <NavLink to="/" className={navLinkActive}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/topic" className={navLinkActive}>
                                    Topic
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/answers" className={navLinkActive}>
                                    Answers
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="layout-default__account">
                        <NavLink to="/login" className={navLinkActive}>Login</NavLink>
                        <NavLink to="/register" className={navLinkActive}>Register</NavLink>
                    </div>
                </header>
                <main className="layout-default__main">
                    <Outlet />
                </main>
                <footer className="layout-default__footer">
                    Copyright @ 2025 by nbv
                </footer>
            </div>
        </>
    )
}

export default LayoutDefault;