// PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

// export default function ProtectedRoute({ children }) {
//     const { isAuthenticated } = useAuth();
//     if (isAuthenticated === null) {
//         return <Navigate to="/" />;
//     }
//     return children;
// }

export function PrivateRoute() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    return isLoggedIn === "true" ? <Navigate to="/home"/>: <Navigate to="/"/>;
}
