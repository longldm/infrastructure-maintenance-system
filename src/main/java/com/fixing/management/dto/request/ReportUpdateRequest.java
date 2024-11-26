package com.fixing.management.dto.request;

import com.fixing.management.entity.LectureHall;
import com.fixing.management.entity.Report;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportUpdateRequest {
    private int id;
    private String reporterId;
    private String assignedSupervisorId;
    private Report.Stage stage = Report.Stage.OPEN;
}
