package com.fixing.management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ReportsProcessedBySupervisorResponse {
    private List<SupervisorReportCount> supervisorReportCounts;  // List of supervisors and their total report counts
}
