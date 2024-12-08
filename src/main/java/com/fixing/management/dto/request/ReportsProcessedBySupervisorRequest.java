package com.fixing.management.dto.request;

import lombok.Data;

@Data
public class ReportsProcessedBySupervisorRequest {
    private int year;  // The year for which we want to count the reports
}
