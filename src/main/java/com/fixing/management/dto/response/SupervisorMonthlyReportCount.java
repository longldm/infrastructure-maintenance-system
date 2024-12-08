package com.fixing.management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class SupervisorMonthlyReportCount {
    private String supervisorId;   // The supervisor's ID
    private Map<String, Integer> monthlyReportCounts;  // Map of months to report counts
}
