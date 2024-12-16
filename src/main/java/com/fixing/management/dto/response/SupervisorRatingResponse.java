package com.fixing.management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SupervisorRatingResponse {
    private String fullName;   // The supervisor's ID
    private Double averageRating;  // The average rating of the supervisor's handled reports
}
