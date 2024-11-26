package com.fixing.management.controller;

import com.fixing.management.dto.request.ApiResponse;
import com.fixing.management.dto.request.ReportCreationRequest;
import com.fixing.management.dto.request.ReportUpdateRequest;
import com.fixing.management.dto.response.ReportResponse;
import com.fixing.management.service.ReportService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")
    ApiResponse<ReportResponse> getReport(@PathVariable int id) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.getReport(id))
                .build();
    }

    @GetMapping("/reporter")
    ApiResponse<List<ReportResponse>> getReportByAccountId(@RequestParam String accountId) {
        return ApiResponse.<List<ReportResponse>>builder()
                .result(reportService.getReportByAccountId(accountId))
                .build();
    }

    // update report
    @PutMapping("/assign-to")
    ApiResponse<ReportResponse> updateReport( @RequestBody @Valid ReportUpdateRequest request) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.updateReport(request))
                .build();
    }
}
