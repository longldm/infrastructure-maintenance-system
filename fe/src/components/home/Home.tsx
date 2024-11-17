import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { USER_ROLE } from '../../constants/role';

function Home() {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(store => store.auth.isAuthenticated);
    const currentUser = useAppSelector(store => store.auth.currentUser);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else if (currentUser.roleId) {
            switch (currentUser.roleId) {
                case USER_ROLE.USER_ROLE_USER:
                    navigate('/user');
                    break;
                case USER_ROLE.USER_ROLE_MANAGER:
                    navigate('/manager');
                    break;
                case USER_ROLE.USER_ROLE_EXECUTOR:
                    navigate('/executor');
                    break;
                default:
                    navigate('/403');
            }
        }
    }, [isAuthenticated, currentUser, navigate]);

    return <div>Loading...</div>; // Optional: Can show a loader or splash screen while redirecting
}

export default Home;
