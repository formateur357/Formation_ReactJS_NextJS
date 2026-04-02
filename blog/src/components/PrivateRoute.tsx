import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const isAutenticated = false; // Simule l'état d'authentification de l'utilisateur

    if (!isAutenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}