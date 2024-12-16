import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateReportPayload, ICreateReportResponse } from "../../../types/Report";
import { sendRequest } from "../../../utils/sendRequest";

export const createReport = createAsyncThunk<ICreateReportResponse, ICreateReportPayload>(
    'api/create-report',
    async (payload: ICreateReportPayload, thunkApi) => {
        return await sendRequest(
            "/report_management/create",
            {
                payload: payload,
                method: "POST",
                thunkApi,
            }
        );
    }
);