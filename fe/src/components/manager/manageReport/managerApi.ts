import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAssignJobPayload, IAssignJobResponse, IGetALlReportPayload, IGetAllReportResponse, IReportItem } from "../../../types/Report";
import { sendRequest } from "../../../utils/sendRequest";
import { IGetAllUsersResponse } from "../../../types/User";

export const getAllReport = createAsyncThunk<IGetAllReportResponse, IGetALlReportPayload>(
    'api/get-all-report',
    async (payload: IGetALlReportPayload, thunkApi) => {
        return await sendRequest(
            "/report_management/all",
            {
                payload: payload ,
                method: "POST",
                thunkApi,
            }
        );
    }
);

export const getAllUser = createAsyncThunk<IGetAllUsersResponse>(
    'api/get-all-user',
    async (thunkApi) => {
        return await sendRequest(
            "/users",
            {
                method: "GET",
                thunkApi,
            }
        );
    }
);

export const assignJobRequest = createAsyncThunk<IAssignJobResponse, IAssignJobPayload>(
    'api/assign-job',
    async (payload: IAssignJobPayload, thunkApi) => {
        return await sendRequest(
            "/report_management/assign-to",
            {
                payload: payload,
                method: "PUT",
                thunkApi,
            }
        );
    }
)