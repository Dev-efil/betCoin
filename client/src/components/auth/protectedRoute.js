import { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
import AuthContext  from '../../contexts/authContext';

const ProtectedRoute = () => {
const { auth } = useContext(AuthContext);
    // const authData = useAuth();
    const location = useLocation();
    return (
        auth.accessToken
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default ProtectedRoute;
