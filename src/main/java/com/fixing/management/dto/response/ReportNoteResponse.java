package com.fixing.management.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportNoteResponse {
    private Integer reportId;
    private String details;    // The content of the note
    private LocalDateTime createdAt;
    private String createdBy;  // User who created the note
}
