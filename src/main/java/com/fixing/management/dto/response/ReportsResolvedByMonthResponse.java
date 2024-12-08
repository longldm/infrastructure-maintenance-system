package com.fixing.management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class ReportsResolvedByMonthResponse {
    private Map<String, Integer> monthlyReportCounts;  // Map of month names to resolved report counts
}
