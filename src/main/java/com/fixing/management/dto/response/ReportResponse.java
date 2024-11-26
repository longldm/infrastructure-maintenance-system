package com.fixing.management.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fixing.management.entity.LectureHall;
import com.fixing.management.entity.Report;
import com.fixing.management.entity.User;
import com.fixing.management.util.StageDeserializer;
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
//    @JsonDeserialize(using = StageDeserializer.class)
    private Report.Stage stage = Report.Stage.OPEN;
}
