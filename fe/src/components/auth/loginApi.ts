import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../../utils/sendRequest';
import { ILogInResponse } from '../../types/Auth';
import { IGetUserInfoResponse } from '../../types/User';

export interface ILoginPayload {
    username: string;
    password: string;
}

export const loginRequest = createAsyncThunk<ILogInResponse, ILoginPayload>(
    'api/login',
    async (payload: ILoginPayload, thunkApi) => {
        return await sendRequest(
            "/auth/token",
            {
                payload: payload ,
                method: "POST",
                thunkApi,
            }
        );
    }
);

export const getUserInfo = createAsyncThunk<IGetUserInfoResponse, void>(
    'api/user-info',
    async (thunkApi) => {
        return await sendRequest(
            "/users/my-info",
            {
                method: "GET",
                thunkApi,
            }
        );
    }
);