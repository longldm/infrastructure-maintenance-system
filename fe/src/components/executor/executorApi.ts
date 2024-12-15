import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetALlReportPayload, IGetAllReportResponse, IUpdateReportResponse, IUpdateStagePayload } from "../../types/Report";
import { sendRequest } from "../../utils/sendRequest";
// const currentUserId = "0f5fbdc1-afda-45e8-bf44-5c3868441008" //working account id - temporary because all other api are not working

export const getReportForExecutor = createAsyncThunk<IGetAllReportResponse, IGetALlReportPayload>(
    'api/get-report-for-executor',
    async (payload: IGetALlReportPayload, thunkApi) => {
        return await sendRequest(
            `/report_management/all`,
            {
                payload: payload,
                method: "POST",
                thunkApi,
            }
        );
    }
);

export const updateReport = createAsyncThunk<IUpdateReportResponse, IUpdateStagePayload>(
    'api/update-report-for-executor',
    async (payload: IGetALlReportPayload, thunkApi) => {
        return await sendRequest(
            `/report_management/update-stage`,
            {
                payload: payload,
                method: "PUT",
                thunkApi,
            }
        );
    }
);
