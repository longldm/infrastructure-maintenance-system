import { createSlice } from "@reduxjs/toolkit";
import { IReportItem } from "../../../types/Report";
import { IUserListResponse } from "../../../types/User";
import { assignJobRequest, getAllReport, getAllUser } from "./managerApi";
import { showAlert } from "../../../utils/showAlert";

interface ManagerState {
    supervisorList: IUserListResponse[],
    reportList: IReportItem[]
}

const initialState: ManagerState = {
    supervisorList: [],
    reportList: []
}

const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllReport.fulfilled, (state, action) => {
                if (action.payload.result.length > 0) {
                    state.reportList = action.payload.result.map((report) => ({
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
            .addCase(assignJobRequest.fulfilled, (state, action) => {
                const updatedReportList = state.reportList.map((report) => {
                    if (report.id === Number(action.payload.result.id)) {
                        return {
                            ...report,
                            assigneeId: action.payload.result.assignedSupervisorId,
                            status: action.payload.result.stage
                        }
                    }
                    return report;
                });
                state.reportList = updatedReportList;
                showAlert('Giao việc thành công', 'success');
            })
            .addCase(assignJobRequest.rejected, (state, action) => {
                showAlert('Giao việc thất bại', 'danger');
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                if (action.payload?.result) {
                    state.supervisorList = action.payload.result.filter(user =>
                        user.roles[0]?.name === 'SUPERVISOR'
                    );
                }
            })
    }
});

export default managerSlice.reducer;