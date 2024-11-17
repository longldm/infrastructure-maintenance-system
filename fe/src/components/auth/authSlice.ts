import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { loginRequest } from './loginApi';


// Try to load user info from local storage
let id_token = localStorage.getItem('id_token');
let refresh_token = localStorage.getItem('refresh_token');
let roleId = null;
let userId = null;
let supperAdmin = false;
let isAuthenticated = Boolean(id_token && refresh_token);
if (id_token) {
    try {
        let tokenDecode: any = jwtDecode(id_token);
        if (tokenDecode) {
            roleId = tokenDecode['role_id'];
            userId = tokenDecode['user_id'];
            supperAdmin = tokenDecode['super_admin'];
        } else {
            isAuthenticated = false;
        }
    } catch (error) {
        isAuthenticated = false;
    }
}

// Verify if refresh token has been expired?
if (refresh_token) {
    try {
        let tokenDecode: any = jwtDecode(refresh_token);
        if (tokenDecode && Object.prototype.hasOwnProperty.call(tokenDecode, 'exp')) {
            let expirationTime = tokenDecode['exp'] * 1000;
            if (expirationTime < new Date().getTime()) {
                isAuthenticated = false;
            }
        }
    } catch (error) {
        isAuthenticated = false;
    }
}

if (!isAuthenticated) {
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('refresh_token');
}

export interface IUser {
    id: number,
    roleId: number,
    isSuperAdmin: boolean;
}

interface AuthState {
    isAuthenticated: boolean,
    error: string,
    loading: boolean,
    currentUser: IUser,
    statusCode: number;
}


const initialState: AuthState = {
    // TODO: Change this to required login
    isAuthenticated: isAuthenticated,
    error: '',
    statusCode: 0,
    loading: false,
    currentUser: {
        id: userId,
        roleId: roleId,
        isSuperAdmin: supperAdmin,
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.isAuthenticated = action.payload.is_active ? true : false;
        },
        logout: state => {
            // state.isAuthenticated = false;
            state.error = '';
            localStorage.removeItem('id_token');
            localStorage.removeItem('refresh_token');
            sessionStorage.removeItem('id_token');
            sessionStorage.removeItem('refresh_token');
        },
        updateUserInfo: (state, action) => {
            state.currentUser.id = action.payload.user_id;
            state.currentUser.roleId = action.payload.role_id;
            state.currentUser.isSuperAdmin = action.payload.super_admin;
        },
    },
    extraReducers: builder => {
        builder.addCase(loginRequest.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                localStorage.setItem('id_token', action.payload.idToken);
                localStorage.setItem('refresh_token', action.payload.refreshToken);
                axios.defaults.headers.common['Authorization'] = "Bearer " + action.payload.idToken;
                state.error = '';
            }
        });

    }
});

export const { userLoggedIn, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;