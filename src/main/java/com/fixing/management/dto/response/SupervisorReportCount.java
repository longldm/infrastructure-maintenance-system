package com.fixing.management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SupervisorReportCount {
    private String supervisorId; // Supervisor's ID
    private Integer reportCount; // Total number of reports resolved by the supervisor in the given year
}
