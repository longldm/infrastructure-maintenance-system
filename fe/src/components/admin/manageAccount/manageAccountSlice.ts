import { createSlice } from "@reduxjs/toolkit";
import { IAccount } from "../../../types/Account";
import { getAllAccounts, createAccount, updateAccount, deleteAccount } from "./manageAccountApi";
import { showAlert } from "../../../utils/showAlert";

interface ManageAccountState {
    loading: boolean;
    error: string | null;
    accounts: IAccount[];
}

const initialState: ManageAccountState = {
    loading: false,
    error: null,
    accounts: [],
};

const manageAccountSlice = createSlice({
    name: 'manageAccount',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = action.payload;
            })
            .addCase(getAllAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch accounts";
                showAlert(state.error, "danger");
            })
            .addCase(createAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts.push(action.payload.result);
                showAlert("Account created successfully", "success");
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create account";
                showAlert(state.error, "danger");
            })
            .addCase(updateAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.accounts.findIndex(account => account.id === action.payload.result.id);
                if (index !== -1) {
                    state.accounts[index] = action.payload.result;
                }
                showAlert("Account updated successfully", "success");
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update account";
                showAlert(state.error, "danger");
            })
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = state.accounts.filter(account => account.id !== action.meta.arg.id);
                showAlert("Account deleted successfully", "success");
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete account";
                showAlert(state.error, "danger");
            });
    }
});

export default manageAccountSlice.reducer;