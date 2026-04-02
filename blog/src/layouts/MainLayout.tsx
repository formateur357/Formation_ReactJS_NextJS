import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {

    return (
        <div>
            <header className="site-header">
                <h1>Mon Blog React</h1>

                <nav className="site-nav">
                    <NavLink to="/">Accueil</NavLink>
                </nav>
            </header>

            <main className="site-main">
                <Outlet />
            </main>

            <footer className="site-footer">
                <p>Copyright © 2026 Mon Blog React</p>
            </footer>
        </div>
    );
}