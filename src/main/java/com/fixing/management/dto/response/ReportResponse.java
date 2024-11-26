package com.fixing.management.dto.response;

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
public class ReportResponse {
    private String id;
    private String accountId;
    private LectureHall lectureHall;
    private String details;
    private Report.Priority priority;
    private Boolean critical;
    @Builder.Default
    private Report.Stage stage = Report.Stage.OPEN;
}
