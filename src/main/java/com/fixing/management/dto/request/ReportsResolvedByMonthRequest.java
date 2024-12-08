package com.fixing.management.dto.request;

import lombok.Data;

@Data
public class ReportsResolvedByMonthRequest {
    private int year;  // The year for which to fetch resolved reports
}
