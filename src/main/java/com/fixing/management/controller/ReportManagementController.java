package com.fixing.management.controller;

import com.fixing.management.dto.request.*;
import com.fixing.management.dto.response.*;
import com.fixing.management.service.ReportService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

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

    @PutMapping("/update-stage")
    ApiResponse<ReportResponse> updateReportStage(@RequestBody @Valid ReportUpdateRequest request) {
        // Call the service to update the report's stage using the data from the request body
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.updateReportStage(request))
                .build();
    }




    @PostMapping("/add-note")
    ApiResponse<ReportNoteResponse> addNoteToReport(
            @RequestBody @Valid ReportNoteCreationRequest request  // Capture the note details from the request body
    ) {
        // Extract the reportId from the request body (assuming it's passed in the request)
        int reportId = request.getReportId();  // Assuming 'reportId' is in the request body

        // Extract the userId from the authenticated context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();  // Assume username represents userId

        // Call the service to add the note
        return ApiResponse.<ReportNoteResponse>builder()
                .result(reportService.addNoteToReport(reportId, request, userId))  // Pass reportId, request, and userId to the service method
                .build();
    }


    @GetMapping("/supervisor-reports")
    ApiResponse<List<ReportResponse>> getReportsAssignedToSupervisor(@RequestParam String supervisorId) {
        // Call the service method to get all reports assigned to the supervisor
        return ApiResponse.<List<ReportResponse>>builder()
                .result(reportService.getReportsAssignedToSupervisor(supervisorId))  // Passing supervisorId to the service
                .build();
    }

    @PostMapping("/all")
    ApiResponse<List<ReportResponse>> getAllReports(@RequestBody @Valid AccountIdRequest accountIdRequest) {
        // Call the service method to get all reports based on accountId
        return ApiResponse.<List<ReportResponse>>builder()
                .result(reportService.getAllReports(accountIdRequest.getAccountId()))  // Passing accountId to the service
                .build();
    }

    @PostMapping("/reports-resolved-by-month")
    public ReportsResolvedByMonthResponse getResolvedReportsByMonth(
            @RequestBody @Valid ReportsResolvedByMonthRequest request) {
        // Call the service and return the response
        return reportService.getResolvedReportsByMonth(request.getYear());
    }

    @GetMapping("/average-rating")
    public ReportsAverageRatingResponse getAverageRatingBySupervisor() {
        // Call the service to get the average ratings by supervisor
        return reportService.getAverageRatingBySupervisor();
    }

    @PostMapping("/reports-processed-by-supervisor")
    public ReportsProcessedBySupervisorResponse getReportCountBySupervisorAndMonth(
            @RequestBody @Valid ReportsProcessedBySupervisorRequest request) {
        // Call the service to get the report count by supervisor and month
        return reportService.getReportCountBySupervisorAndMonth(request.getYear());
    }


}
