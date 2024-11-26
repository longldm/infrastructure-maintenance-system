package com.fixing.management.controller;

import com.fixing.management.dto.request.ApiResponse;
import com.fixing.management.dto.request.ReportCreationRequest;
import com.fixing.management.dto.request.UserCreationRequest;
import com.fixing.management.dto.response.ReportResponse;
import com.fixing.management.dto.response.UserResponse;
import com.fixing.management.service.ReportService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report_management")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ReportManagementController {

    ReportService reportService;

    @PostMapping
    ApiResponse<ReportResponse> createReport(@RequestBody @Valid ReportCreationRequest request) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.createReport(request))
                .build();
    }
}
