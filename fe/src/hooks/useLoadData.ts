import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserInfo } from '../components/auth/loginApi';

export default function useLoadData(): void {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(store => store.auth.isAuthenticated);

    React.useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUserInfo());
        }
    }, [isAuthenticated]);

}