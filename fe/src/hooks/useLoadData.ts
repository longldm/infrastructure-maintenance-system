import axios from 'axios';
import * as React from 'react';
import { redirect } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { refreshToken } from '../axiosConfig';

//create uselogs
export default function useLoadData(): void {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(store => store.auth.isAuthenticated);
    const currentUser = useAppSelector(store => store.auth.currentUser);
    React.useLayoutEffect(() => {
        const getUserInfo = async () => {
            await axios.get('/user/user_info')
                .then(async function (response) {
                    if ((currentUser.roleId && currentUser.roleId !== response.data.role_id) ||
                        (currentUser.id && currentUser.isSuperAdmin !== response.data.super_admin)
                    ) {
                        await refreshToken();
                    }
                    // dispatch(updateUserInfo(response.data));
                })
                .catch(function (error) {
                    localStorage.removeItem('id_token');
                    localStorage.removeItem('refresh_token');
                    sessionStorage.removeItem('id_token');
                    sessionStorage.removeItem('refresh_token');
                    redirect("/login");
                });
        };
        if (isAuthenticated) {
            getUserInfo();
        }
    }, [currentUser, dispatch, isAuthenticated]);

    React.useLayoutEffect(() => {
        const createLog = async () => {
            if (isAuthenticated) {
                // Log user login
                let currentTime = new Date().getTime();
                let lastestTime = localStorage.getItem("session_time");
                if (!lastestTime || currentTime - parseInt(lastestTime) >= 4 * 60 * 60 * 1000) {
                    localStorage.setItem("session_time", currentTime.toString());
                }
            }
        };
        createLog();
    }, [isAuthenticated, dispatch]);
}