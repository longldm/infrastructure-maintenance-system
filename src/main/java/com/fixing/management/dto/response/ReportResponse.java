package com.fixing.management.dto.response;

import com.fixing.management.entity.LectureHall;
import com.fixing.management.entity.Report;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportResponse {
    private String id;
    private String reporterId;
    private String assignedSupervisorId;
    private LectureHall lectureHall;
    private String details;
    private Report.Priority priority;
    private Boolean critical;
    private Report.Stage stage = Report.Stage.OPEN;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
