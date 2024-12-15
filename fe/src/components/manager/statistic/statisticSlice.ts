import { createSlice } from "@reduxjs/toolkit";
import { IGetAverageRatingResponse, IGetReportResolvedByMonthResponse } from "../../../types/Report";
import { getAverageRatingBySupervisor, getReportResolvedByMonth } from "./statisticApi";

interface StatisticState {
    reportByMonth: IGetReportResolvedByMonthResponse
    ratingBySupervisor: IGetAverageRatingResponse
}

const initialState: StatisticState = {
    reportByMonth: {
        monthlyReportCounts: {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0
        }
    },
    ratingBySupervisor: {
        supervisorRatings: []
    }
}

const statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getReportResolvedByMonth.fulfilled, (state, action) => {
                state.reportByMonth = action.payload;
            })
            .addCase(getAverageRatingBySupervisor.fulfilled, (state, action) => {
                state.ratingBySupervisor = action.payload;
            })
    }
});
    
export default statisticSlice.reducer;