import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
function Home() {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(store => store.auth.isAuthenticated);
    const currentUser = useAppSelector(store => store.auth.currentUser);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
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
