package com.fixing.management.dto.response;

import lombok.Data;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor  // Ensure the DTO has a constructor that takes in the list
public class ReportsAverageRatingResponse {
    private List<SupervisorRatingResponse> supervisorRatings;  // List of supervisor ratings
}
