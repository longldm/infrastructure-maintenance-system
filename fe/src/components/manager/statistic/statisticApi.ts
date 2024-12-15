import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetAverageRatingResponse, IGetReportResolvedByMonthPayload, IGetReportResolvedByMonthResponse } from "../../../types/Report";
import { sendRequest } from "../../../utils/sendRequest";

export const getReportResolvedByMonth = createAsyncThunk<IGetReportResolvedByMonthResponse, IGetReportResolvedByMonthPayload>(
    'api/get-report-resolved-by-month',
    async (payload: IGetReportResolvedByMonthPayload, thunkApi) => {
        return await sendRequest(
            "/report_management/reports-resolved-by-month",
            {
                payload: payload ,
                method: "POST",
                thunkApi,
            }
        );
    }
);

export const getAverageRatingBySupervisor = createAsyncThunk<IGetAverageRatingResponse, void>(
    'api/get-average-rating-by-supervisor',
    async (thunkApi) => {
        return await sendRequest(
            "/report_management/average-rating",
            {
                method: "GET",
                thunkApi,
            }
        );
    }
);