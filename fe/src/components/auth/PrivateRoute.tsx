import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import useLoadData from '../../hooks/useLoadData';
import { USER_ROLE } from '../../constants/role';


function PrivateRoute() {
    useLoadData();
    const isAuthenticated = useAppSelector(store => store.auth.isAuthenticated);
    const currentUser = useAppSelector(store => store.auth.currentUser);
    const location = useLocation();
    if (isAuthenticated) {
        // system admin
        if (currentUser.roleId && (!currentUser.isSuperAdmin && currentUser.roleId !== USER_ROLE.USER_ROLE_SYSTEM_ADMIN) && location.pathname !== "/admin") {
            return <Navigate to="/403" state={location} />;
        }
        // normal user
        if (currentUser.roleId && currentUser.roleId === USER_ROLE.USER_ROLE_USER && (["/manager", "/executor", "/admin"].includes(location.pathname))) {
            return <Navigate to="/403" state={location} />;
        }
        // manager
        if (currentUser.roleId && currentUser.roleId === USER_ROLE.USER_ROLE_MANAGER && (["/user", "/executor", "/admin"].includes(location.pathname))) {
            return <Navigate to="/403" state={location} />;
        }
        // executor
        if (currentUser.roleId && currentUser.roleId === USER_ROLE.USER_ROLE_EXECUTOR && (["/user", "/manager", "/admin"].includes(location.pathname))) {
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