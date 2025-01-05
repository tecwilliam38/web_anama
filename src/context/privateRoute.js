// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
}

