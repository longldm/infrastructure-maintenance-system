import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../../utils/sendRequest';

export const loginRequest = createAsyncThunk(
    'api/login',
    async (payload: { username: string; password: string }, thunkApi) => {
        return await sendRequest(
            "/auth/login",
            {
                payload: payload ,
                method: "POST",
                thunkApi
            }
        );
    }
);
