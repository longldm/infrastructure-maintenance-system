import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAccount, ICreateAccountPayload, ICreateAccountResponse, IUpdateAccountPayload, IUpdateAccountResponse, IDeleteAccountPayload, IDeleteAccountResponse } from "../../../types/Account";
import { sendRequest } from "../../../utils/sendRequest";

export const getAllAccounts = createAsyncThunk<IAccount[]>(
    'api/get-all-accounts',
    async (thunkApi) => {
        return await sendRequest(
            "/accounts",
            {
                method: "GET",
                thunkApi,
            }
        );
    }
);

export const createAccount = createAsyncThunk<ICreateAccountResponse, ICreateAccountPayload>(
    'api/create-account',
    async (payload: ICreateAccountPayload, thunkApi) => {
        return await sendRequest(
            "/users",
            {
                payload: payload,
                method: "POST",
                thunkApi,
            }
        );
    }
);

export const updateAccount = createAsyncThunk<IUpdateAccountResponse, IUpdateAccountPayload>(
    'api/update-account',
    async (payload: IUpdateAccountPayload, thunkApi) => {
        return await sendRequest(
            `/accounts/${payload.id}`,
            {
                payload: payload,
                method: "PUT",
                thunkApi,
            }
        );
    }
);

export const deleteAccount = createAsyncThunk<IDeleteAccountResponse, IDeleteAccountPayload>(
    'api/delete-account',
    async (payload: IDeleteAccountPayload, thunkApi) => {
        return await sendRequest(
            `/accounts/${payload.id}`,
            {
                method: "DELETE",
                thunkApi,
            }
        );
    }
);