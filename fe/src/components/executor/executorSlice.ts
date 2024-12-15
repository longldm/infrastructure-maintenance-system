import { createSlice } from "@reduxjs/toolkit";
import { getAllReport } from "../manager/manageReport/managerApi";
import { IReportItem } from "../../types/Report";
import { useAppSelector } from "../../app/hooks";
import { getReportForExecutor, updateReport } from "./executorApi";
import { showAlert } from "../../utils/showAlert";

interface ExecutorState {
    reportList: IReportItem[]
}

const initialState: ExecutorState = {
    reportList: []
}

const executorSlice = createSlice({
    name: 'executor',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getReportForExecutor.fulfilled, (state, action) => {
                if (action.payload.result.length > 0) {
                    state.reportList = action.payload.result
                        .map((report) => ({
                            id: Number(report.id),
                            reporterId: report.reporterId,
                            location: `${report.lectureHall.building}, ${report.lectureHall.floor}, ${report.lectureHall.room}`, // Convert lectureHall to location string
                            assigneeId: report.assignedSupervisorId,
                            note: report.details,
                            time: report.createdAt.toLocaleString().replace("T", " "),
                            status: report.stage
                        }));
                }
            })
            .addCase(updateReport.fulfilled, (state, action) => {
                state.reportList = state.reportList.map((report) => {
                    if (report.id === Number(action.payload.result.id)) {
                        return {
                            ...report,
                            assigneeId: action.payload.result.assignedSupervisorId,
                            status: action.payload.result.stage,
                        };
                    }
                    return report;
                });
                showAlert("Cập nhật thành công", "success");
            })
            .addCase(updateReport.rejected, (state, action) => {
                showAlert("Cập nhật thất bại", "danger");
            })
    }
});

export default executorSlice.reducer;