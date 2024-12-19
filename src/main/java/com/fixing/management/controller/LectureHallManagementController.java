package com.fixing.management.controller;

import com.fixing.management.dto.request.*;
import com.fixing.management.dto.response.*;
import com.fixing.management.service.ReportService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lecture-hall")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LectureHallManagementController {

    ReportService reportService;

    @PostMapping
    ApiResponse<ReportResponse> createReport(@RequestBody @Valid ReportCreationRequest request) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.createReport(request))
                .build();
    }


    @GetMapping("/all")
    ApiResponse<List<LectureHallResponse>> getAllLectureHall() {
        return ApiResponse.<List<LectureHallResponse>>builder()
                .result(reportService.getAllLectureHall())
                .build();
    }

}
