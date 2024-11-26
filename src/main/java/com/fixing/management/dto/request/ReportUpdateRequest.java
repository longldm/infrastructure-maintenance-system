package com.fixing.management.dto.request;

import com.fixing.management.entity.LectureHall;
import com.fixing.management.entity.Report;
import com.fixing.management.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportUpdateRequest {
    private String accountId;
    private LectureHall lectureHall;
    private String details;
    private Report.Priority priority;
    private Boolean critical;
    private Report.Stage stage = Report.Stage.OPEN;
}
