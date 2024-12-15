import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { USER_ROLE } from '../../constants/role';
import { useEffect } from 'react';
import { getUserInfo } from './loginApi';

function PrivateRoute() {
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(store => store.auth.isAuthenticated);
    const currentUser = useAppSelector(store => store.auth.currentUser);
    
    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])

    const location = useLocation();
    if (isAuthenticated) {
        // system admin
        if (currentUser.role.id && (currentUser.role.id === USER_ROLE.USER_ROLE_SYSTEM_ADMIN) && location.pathname !== "/admin") {
            return <Navigate to="/403" state={location} />;
        }
        // normal user
        if (currentUser.role.id && currentUser.role.id === USER_ROLE.USER_ROLE_USER && (["/manager", "/executor", "/admin"].includes(location.pathname))) {
            return <Navigate to="/403" state={location} />;
        }
        // manager
        if (currentUser.role.id && currentUser.role.id === USER_ROLE.USER_ROLE_MANAGER && (["/user", "/executor", "/admin"].includes(location.pathname))) {
            return <Navigate to="/403" state={location} />;
        }
        // executor
        if (currentUser.role.id && currentUser.role.id === USER_ROLE.USER_ROLE_EXECUTOR && (["/user", "/manager", "/admin"].includes(location.pathname))) {
            return <Navigate to="/403" state={location} />;
        }
        return (<Outlet />);
    }
    else {
        // return (<Navigate to="/login" state={location} />);
        return (<Outlet />);
    }

}


export default PrivateRoute;