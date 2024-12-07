package com.fixing.management.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportNoteCreationRequest {
    private Integer id;       // Report Note ID
    private Integer reportId; // Report ID to which the note is attached
    private String details;   // The content or body of the note
}

