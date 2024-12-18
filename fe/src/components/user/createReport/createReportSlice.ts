import { createSlice } from "@reduxjs/toolkit";
import { ICreateReportResponse, ILectureHall, IReportItem } from "../../../types/Report";
import { createReport, getLectureHallList } from "./createReportApi";
import { showAlert } from "../../../utils/showAlert";
import { getAllReport } from "../../manager/manageReport/managerApi";

interface CreateReportState {
    loading: boolean;
    error: string | null;
    report: IReportItem;
    reportedList: IReportItem[];
    lectureHallList: ILectureHall[];
}

const initialState: CreateReportState = {
    loading: false,
    error: null,
    report: {} as IReportItem,
    reportedList: [],
    lectureHallList: []
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
            .addCase(getLectureHallList.fulfilled, (state, action) => {
                state.lectureHallList = action.payload.result;
            })
            .addCase(createReport.fulfilled, (state, action) => {
                state.loading = false;
                state.report.id = Number(action.payload.result.id);
                state.report.reporterId = action.payload.result.reporterId;
                state.report.location = `${action.payload.result.lectureHall.building}, ${action.payload.result.lectureHall.floor}, ${action.payload.result.lectureHall.room}`;
                state.report.assigneeId = action.payload.result.assignedSupervisorId;
                state.report.note = action.payload.result.details;
                state.report.time = action.payload.result.createdAt;
                state.report.status = action.payload.result.stage;
                showAlert("Report created successfully", "success");
                const newReport: IReportItem = {
                    id: Number(action.payload.result.id),
                    reporterId: action.payload.result.reporterId,
                    location: `${action.payload.result.lectureHall.building}, ${action.payload.result.lectureHall.floor}, ${action.payload.result.lectureHall.room}`,
                    assigneeId: action.payload.result.assignedSupervisorId,
                    note: action.payload.result.details,
                    time: action.payload.result.createdAt,
                    status: action.payload.result.stage
                }
                state.reportedList.push(newReport);
            })
            .addCase(createReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create report";
                showAlert(state.error, "danger");
            })
            .addCase(getAllReport.fulfilled, (state, action) => {
                if (action.payload.result.length > 0) {
                    state.reportedList = action.payload.result.map((report) => ({
                        id: Number(report.id),
                        reporterId: report.reporterId,
                        location: `${report.lectureHall.building}, ${report.lectureHall.floor}, ${report.lectureHall.room}`, // Convert lectureHall to location string
                        assigneeId: report.assignedSupervisorId,
                        note: report.details,
                        time: report.createdAt.toLocaleString().replace('T', ' '),
                        status: report.stage
                    }));
                }
            })
    }
});

export default createReportSlice.reducer;