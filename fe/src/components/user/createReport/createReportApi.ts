import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateReportPayload, ICreateReportResponse, ILectureHallResponse } from "../../../types/Report";
import { sendRequest } from "../../../utils/sendRequest";

export const createReport = createAsyncThunk<ICreateReportResponse, ICreateReportPayload>(
    'api/create-report',
    async (payload: ICreateReportPayload, thunkApi) => {
        return await sendRequest(
            "/report_management",
            {
                payload: payload,
                method: "POST",
                thunkApi,
            }
        );
    }
);

export const getLectureHallList = createAsyncThunk<ILectureHallResponse>(
    'api/get-lecture-hall-list',
    async (_, thunkApi) => {
        return await sendRequest(
            "/lecture-hall/all",
            {
                method: "GET",
                thunkApi,
            }
        );
    }
);