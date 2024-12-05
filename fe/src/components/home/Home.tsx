import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { USER_ROLE } from '../../constants/role';
import { getUserInfo } from '../auth/loginApi';

function Home() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(store => store.auth.isAuthenticated);
    const currentUser = useAppSelector(store => store.auth.currentUser);
    // useLoadData();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            console.log('test: ', currentUser)
            if (currentUser.role.id) {
                if (currentUser.role.id === 1) {
                    navigate('/user');
                } else if (currentUser.role.id === 2) {
                    navigate('/manager');
                } else if (currentUser.role.id === 3) {
                    navigate('/executor');
                } else if (currentUser.role.id === 4) {
                    navigate('/admin');
                } else {
                    navigate('/login')
                }
            }
        }
    }, [isAuthenticated, currentUser, navigate]);

    return <div>Loading...</div>; // Optional: Can show a loader or splash screen while redirecting
}

export default Home;
