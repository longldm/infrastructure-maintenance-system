import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getUserInfo, loginRequest } from './loginApi';
import { IUser } from '../../types/User';
import { showAlert } from '../../utils/showAlert';


// Try to load user info from local storage
let id_token = localStorage.getItem('id_token');
let refresh_token = localStorage.getItem('refresh_token');
let isAuthenticated = Boolean(id_token && refresh_token);

if (id_token) {
    try {
        let tokenDecode: any = jwtDecode(id_token);
        if (tokenDecode) {
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
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        dob: '',
        role: {
            id: -1,
            name: '',
            description: '',
            permissions: [],
        },
    },
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
            localStorage.removeItem('userid');
        },
        updateUserInfo: (state, action) => {
            state.currentUser = action.payload.result.user;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginRequest.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isAuthenticated = true;
                    localStorage.setItem('id_token', action.payload.result.token);
                    localStorage.setItem('refresh_token', action.payload.result.token);
                    axios.defaults.headers.common['Authorization'] = "Bearer " + action.payload.result.token;
                    state.error = '';
                    showAlert('Đăng nhập thành công', 'success');
                }
            })
            .addCase(loginRequest.rejected, (state, action) => {
                showAlert('Sai tài khoản hoặc mật khẩu', 'danger')
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.currentUser.id = action.payload.result.id;
                state.currentUser.username = action.payload.result.username;
                state.currentUser.firstName = action.payload.result.firstName;
                state.currentUser.lastName = action.payload.result.lastName;
                state.currentUser.dob = action.payload.result.dob;
                state.currentUser.role.name = action.payload.result.roles[0].name;
                state.currentUser.role.description = action.payload.result.roles[0].description;
                state.currentUser.role.permissions = action.payload.result.roles[0].permissions;
                if (action.payload.result.roles[0].name === 'REPORTER') {
                    state.currentUser.role.id = 1;
                } else if (action.payload.result.roles[0].name === 'MANAGER') {
                    state.currentUser.role.id = 2;
                } else if (action.payload.result.roles[0].name === 'SUPERVISOR') {
                    state.currentUser.role.id = 3;
                } else if (action.payload.result.roles[0].name === 'ADMIN') {
                    state.currentUser.role.id = 4;
                }
                localStorage.setItem('userid', state.currentUser.id)
            })

    }
});

export const { userLoggedIn, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;