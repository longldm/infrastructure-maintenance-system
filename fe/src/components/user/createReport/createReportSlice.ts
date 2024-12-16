import { createSlice } from "@reduxjs/toolkit";
import { ICreateReportResponse } from "../../../types/Report";
import { createReport } from "./createReportApi";
import { showAlert } from "../../../utils/showAlert";

interface CreateReportState {
    loading: boolean;
    error: string | null;
    report: ICreateReportResponse | null;
}

const initialState: CreateReportState = {
    loading: false,
    error: null,
    report: null,
};

const createReportSlice = createSlice({
    name: 'createReport',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReport.fulfilled, (state, action) => {
                state.loading = false;
                state.report = action.payload;
                showAlert("Report created successfully", "success");
            })
            .addCase(createReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create report";
                showAlert(state.error, "danger");
            });
    }
});

export default createReportSlice.reducer;