package com.fixing.management.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class ReportsProcessedBySupervisorResponse {
    private List<SupervisorMonthlyReportCount> supervisorReportCounts;  // List of supervisors and their monthly report counts
}
