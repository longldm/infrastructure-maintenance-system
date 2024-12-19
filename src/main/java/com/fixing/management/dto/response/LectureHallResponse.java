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
public class LectureHallResponse {
    private LectureHall lectureHall;
}
